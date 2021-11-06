import React, { useContext, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Row } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { db } from "../../../controller/api/firebase";
import { getSingleUser } from "../../../controller/auth";
import { useAuth } from "../../context/AuthContext";
import { NoteContext } from "../../context/NotesContext";
import { useHistory } from "react-router-dom";

const NotesListHomePage = (props) => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useContext(NoteContext);
  const [customUser, setCustomUser] = useState();

  const history = useHistory();

  const moveToNotePage = (note) => {
    history.push("/note/${note.id}", note);
  };

  useEffect(() => {
    getSingleUser(currentUser.uid, (response) => {
      if (response.status) {
        setCustomUser(response.data);
      } else {
        alert(response.message);
      }
    });
  });

  return (
    <section className="recent-notes">
      <Row className="recent-notes-title">
        <h1>Recent Notes</h1>
      </Row>
      <ListGroup variant="flush">
        {notes.map((note, index) => {
          return (
            <ListGroup.Item
              key={index}
              note={note}
              onClick={() => moveToNotePage(note)}
            >
              <div
                className="recent-notes-list"
                onClick={() => alert("route to note")}
              >
                <h2>{note.title}</h2>
                <h4>{note.course_name}</h4>
                <h6>{note.lastUpdate.toDate().toDateString()}</h6>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </section>
  );
};

export default NotesListHomePage;
