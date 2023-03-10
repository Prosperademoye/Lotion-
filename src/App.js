import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./right";
import Sidebar from "./left";
import Navbar from "./Navbar";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  // new stuff
  const [currentNoteTitle, setCurrentNoteTitle] = useState("");
  const [currentNoteBody, setCurrentNoteBody] = useState("");

  const updateNoteHandler = (title, body) => {
    const updatedNote = notes.map((notes) => {
      if (notes.id === currentNoteBody.id) {
        return { ...notes, title, body };
      } else {
        return notes;
      }
    });
  };
  // new stuff
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    const answer = window.confirm("Are You Sure?");
    localStorage.removeItem(activeNote.id);
    if (answer) {
      const acc = (notes) => notes.filter((notes) => notes.id != noteId);
      setNotes(acc);
    }
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  const [showDiv, setShowDiv] = useState(true);

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  return (
    <div className="Container">
      <Navbar toggleDiv={toggleDiv} />
      <div className="App">
        {showDiv && (
          <Sidebar
            notes={notes}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
        )}
        <Main
          activeNote={getActiveNote()}
          onUpdateNote={onUpdateNote}
          notes={notes}
          setActiveNote={setActiveNote}
          onDeleteNote={onDeleteNote}
          onAddNote={onAddNote}
        />
      </div>
    </div>
  );
}

export default App;
