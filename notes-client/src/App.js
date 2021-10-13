import "./App.css";

import React, { Component } from "react";

import Note from "./components/Note";
import logo from "./logo.svg";

class App extends Component {
  state = { notes: [], filter: "none" };
  async componentDidMount() {
    try {
      const {
        data: {
          listNotes: { items },
        },
      } = null; //await API call
      this.setState({ notes: items });
    } catch (err) {
      console.log("error fetching notes...", err);
    }

    const newSocket = io(`http://localhost:5000`);
    console.log(newSocket);
    this.setState({ socket: newSocket });
    const editor = this.quillEditor.current.getEditor();
    newSocket.on("uuid", (uuid) => {
      this.setState({ uuid });
    });
    newSocket.on("update", (update) => {
      console.log(update);
      editor.updateContents(update.delta);
    });
  }
  componentWillUnmount() {
    this.state.socket.close();
  }
  createNote = async (note) => {
    const notes = [note, ...this.state.notes];
    const newNotes = this.state.notes;
    this.setState({ notes });
    try {
      const data = null; //await API call
      this.setState({ notes: [data.data.createNote, ...newNotes] });
    } catch (err) {
      console.log("error creating note..", err);
    }
  };
  updateNote = async (note) => {
    const updatedNote = {
      ...note,
      status: note.status === "new" ? "completed" : "new",
    };
    const index = this.state.notes.findIndex((i) => i.id === note.id);
    const notes = [...this.state.notes];
    notes[index] = updatedNote;
    this.setState({ notes });

    try {
      //await API call
    } catch (err) {
      console.log("error updating note...", err);
    }
  };
  deleteNote = async (note) => {
    const input = { id: note.id };
    const notes = this.state.notes.filter((n) => n.id !== note.id);
    this.setState({ notes });
    try {
      //await API call
    } catch (err) {
      console.log("error deleting note...", err);
    }
  };
  updateFilter = (filter) => this.setState({ filter });
  render() {
    let { notes, filter } = this.state;
    if (filter === "completed") {
      notes = notes.filter((n) => n.status === "completed");
    }
    if (filter === "new") {
      notes = notes.filter((n) => n.status === "new");
    }
    return (
      <div>
        <p>Notes</p>
        <div>
          <p onClick={() => this.updateFilter("none")}>All</p>
          <p onClick={() => this.updateFilter("completed")}>Completed</p>
          <p onClick={() => this.updateFilter("new")}>Pending</p>
        </div>
        <ReactQuill
          onChange={(html, delta, source, editor) => {
            if (source !== "user") return;
            this.state.socket.emit("change", delta);
            // this.setState({ quill: changes });
          }}
          ref={this.quillEditor}
          modules={this.modules}
          formats={this.formats}
        />
        <button
          onClick={() => {
            this.setState({ quill: "<p>Test</p>" });
          }}
        >
          Hello
        </button>
      </div>
    );
  }
}

export default App;
