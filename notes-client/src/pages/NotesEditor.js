import "react-quill/dist/quill.snow.css";

import React, { useEffect, useRef, useState } from "react";

import ReactQuill from "react-quill";
import { baseURL } from "../utils/config";
import io from "socket.io-client";

export default function NotesEditor() {
  const [socket, setSocket] = useState(null);
  const quillEditor = useRef(null);

  useEffect(() => {
    const newSocket = io(`${baseURL}`);
    setSocket(newSocket);
    const editor = quillEditor.current.getEditor();
    newSocket.on("update", (update) => {
      console.log(update);
      editor.updateContents(update.delta);
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
