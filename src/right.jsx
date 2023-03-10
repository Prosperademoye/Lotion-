import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
const Main = ({
  activeNote,
  onUpdateNote,
  notes,
  setActiveNote,
  onAddNote,
  onDeleteNote,
  handleSaveNote,
}) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  const [value, setValue] = useState("");

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <div className="right-top">
          <div className="right-top-left">
            <input
              className="titlw"
              type="text"
              id="title"
              placeholder="Note Title"
              value={activeNote.title}
              onChange={(e) => onEditField("title", e.target.value)}
              autoFocus
            />
          </div>
          <div className="right-top-right">
            <div className="save-delete">
              <button
                className="save"
                onClick={() => handleSaveNote(activeNote)}
              >
                Save
              </button>
              <button
                className="delete"
                onClick={() => onDeleteNote(activeNote.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <ReactQuill
          id="body"
          className="textarea"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(value) => onEditField("body", value)}
        />
      </div>
    </div>
  );
};

export default Main;
