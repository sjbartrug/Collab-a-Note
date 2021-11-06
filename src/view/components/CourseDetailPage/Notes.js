import React, { useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import "../../styles/CourseDetail.css";
import { Button, Fab, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  getNotes,
  addNote,
  deleteNote,
  updateNote,
  updateNoteTitle,
} from "../../../controller/note";
import AddNoteForm from "./AddNoteForm";
import { useHistory } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import { useAuth } from "../../context/AuthContext";
import { getSingleUser } from "../../../controller/auth";

const Notes = (props) => {
  const [notes, setNotes] = useState([]);
  const [addNoteForm, setAddNoteForm] = useState(false);
  const [focusNote, setFocusNote] = useState(null);
  const history = useHistory();
  const [isAdding, setIsAdding] = useState(false);
  const { currentUser } = useAuth();

  const customUser = props.user;

  const addNoteIconStyle = {
    marginRight: "30px",
    width: "50px",
    height: "50px",
    top: "20px",
    right: "10px",
    bottom: "0",
    left: "auto",
    position: "absolute",
  };

  const handleAddNote = (newNote) => {
    setIsAdding(true);
    addNote(newNote, (response) => {
      setIsAdding(false);
      if (response.status) {
        setNotes((previousNotes) => [newNote, ...previousNotes]);
      } else {
        alert(response.message);
      }
      setAddNoteForm(false);
    });
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId, (response) => {
      if (response.status) {
        setNotes(notes.filter((note) => note.id != noteId));
      } else {
        alert(response.message);
      }
    });
  };

  const handleEditNote = (updatedNote) => {
    setIsAdding(true);
    updateNoteTitle(updatedNote, (response) => {
      setIsAdding(false);
      setFocusNote(null);
      if (response.status) {
        setNotes(
          notes.map((note) => {
            if (note.id === updatedNote.id) {
              return {
                ...note,
                title: updatedNote.title,
                lastUpdate: updatedNote.lastUpdate,
              };
            }
            return note;
          })
        );
      } else {
        alert(response.message);
      }
    });
  };

  const moveToNotePage = (note) => {
    history.push(`/note/${note.id}`, note);
  };

  useEffect(() => {
    const course = props.course;
    console.log(course);
    getNotes(course.id, (response) => {
      if (response.status) {
        setNotes(response.data);
      } else {
        //Handle Error
      }
    });
  }, []);

  if (!customUser) return null;

  return (
    <div className="notes-container">
      <h1 className="detail-subtitle">Notes</h1>

      {/* <Fab color="primary" aria-label="add" style={addNotesIconStyle} onClick={() => {setAddNoteForm(true)}}>
                <AddIcon/>
            </Fab> */}

      <IconButton onClick={() => setAddNoteForm(true)} style={addNoteIconStyle}>
        <AddIcon />
      </IconButton>
      <AddNoteForm
        isAdding={isAdding}
        currentUser={customUser}
        formStatus={addNoteForm}
        course={props.course}
        handleClose={() => setAddNoteForm(false)}
        addNote={(newNote) => handleAddNote(newNote)}
      />
      {focusNote ? (
        <EditNoteForm
          note={focusNote}
          handleClose={() => setFocusNote(null)}
          editNote={(updatedNote) => handleEditNote(updatedNote)}
        />
      ) : null}

      {notes.map((note) => (
        <NoteItem
          key={note.id}
          isOwner={note.ownerId === currentUser.uid}
          note={note}
          onClick={() => moveToNotePage(note)}
          deleteNote={(noteId) => handleDeleteNote(noteId)}
          openEditTitleForm={() => {
            setFocusNote(note);
          }}
        />
      ))}
    </div>
  );

  //   useEffect(() => {
  //     setNotes(this.props.location.classItem.notes);
  //   }, []);

  //     const [notes, setNotes] = useState([]);

  //     const [addNoteForm, setAddNoteForm] = useState(false)

  //   return (
  //     <div>
  //       <h1 className="dashboard-body-title">Notes</h1>
  //       <Fab
  //         color="primary"
  //         aria-label="add"
  //         style={addClassIconStyle}
  //         onClick={() => setAddClassForm(true)}
  //       >
  //         <AddIcon />
  //       </Fab>
  //       {notes.map((note) => {
  //         <NoteItem**
  //           title={note.title}
  //           dateCreation={note.dateCreation}
  //           dateUpdate={note.lastUpdate}
  //         />;
  //       })}

  //        {/* <NoteItem
  // //                 title="Program Design"
  // //                 dateCreation="Aug, 28th"
  // //                 dateUpdate="Aug, 30th"
  // //             />
  // //             <NoteItem
  // //                 title="Agile"
  // //                 dateCreation="Aug, 28th"
  // //                 dateUpdate="Aug, 30th"
  // //             />
  // //             <NoteItem
  // //                 title="Design Pattern"
  // //                 dateCreation="Aug, 28th"
  // //                 dateUpdate="Aug, 30th"
  // //             />
  // //             <NoteItem
  // //                 title="Midterm Review"
  // //                 dateCreation="Aug, 28th"
  // //                 dateUpdate="Aug, 30th"
  // //             /> */}
  //      </div>
  //   );
  // };
};

export default Notes;
