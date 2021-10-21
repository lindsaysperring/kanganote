import "react-quill/dist/quill.snow.css";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";

import ReactQuill from "react-quill";
import axios from "axios";
import { baseURL } from "../utils/config";
import io from "socket.io-client";
import { userContext } from "../Routing";

export default function NotesEditor() {
  const [socket, setSocket] = useState(null);
  const quillEditor = useRef(null);
  const { userData } = useContext(userContext);
  const history = useHistory();

  const { note_id } = useParams();

  useEffect(() => {
    if (!userData.isLoggedIn || !note_id) {
      return history.push("/");
    }

    const newSocket = io(`${baseURL}`, {
      query: { token: userData.user.token },
    });
    setSocket(newSocket);
    const editor = quillEditor.current.getEditor();
    editor.disable();

    newSocket.on("update", (update) => {
      console.log("update", update);
      editor.updateContents(update.delta);
    });

    newSocket.emit("getNote", note_id);

    newSocket.once("load-note", (note) => {
      console.log(note);
      editor.setContents(note);
      editor.enable();
      setInterval(() => {
        axios
          .patch(
            `${baseURL}/api/notes/save/${note_id}`,
            {
              note: editor.getContents(),
            },
            { headers: { Authorization: `Bearer ${userData.user.token}` } }
          )
          .catch((err) => {});
      }, 2000);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div>
      <ReactQuill
        onChange={(html, delta, source, editor) => {
          console.log("contents", editor.getContents());
          if (source !== "user") return;
          socket.emit("change", delta);
        }}
        ref={quillEditor}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
