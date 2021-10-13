import "react-quill/dist/quill.snow.css";

import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import io from "socket.io";

export default function NotesEditor() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(`http://localhost:5000`);
    setSocket(newSocket);
    const editor = this.quillEditor.current.getEditor();
    newSocket.on("update", (update) => {
      console.log(update);
      editor.updateContents(update.delta);
    });
    return () => {
      newSocket.close();
    };
  }, []);
  return (
    <div>
      <ReactQuill
        onChange={(html, delta, source, editor) => {
          if (source !== "user") return;
          socket.emit("change", delta);
        }}
        ref={this.quillEditor}
        modules={this.modules}
        formats={this.formats}
      />
    </div>
  );
}
