import React, { useState } from "react";
import "../../styles/DashBoard.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

const AddNoteForm = (props) => {
  const [newNote, setNewNote] = useState({
    id: "",
    courseId: props.course.id,
    title: "",
    content: "Your note goes here...",
    ownerId: props.currentUser.id,
    owner: props.currentUser,
    creationDate: "",
    lastUpdate: "",
  });

  const getCurrentTime = () => {
    return new Date();
  };

  const createNewNoteId = () => {
    const id = uuidv4();
    console.log(id);
    return id;
  };

  const handleTitleChange = (event) => {
    setNewNote({
      ...newNote,
      title: event.target.value,
    });
  };

  return (
    <div>
      <Dialog
        open={props.formStatus}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="form-dialog-title"> Add Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add note to your {props.course.name} course.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            onChange={(e) => handleTitleChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          {props.isAdding ? (
            <CircularProgress />
          ) : (
            <Button
              disabled={newNote.title == ""}
              onClick={() => {
                const id = createNewNoteId();
                const creationDate = getCurrentTime();
                const lastUpdate = getCurrentTime();

                props.addNote({
                  ...newNote,
                  id,
                  creationDate,
                  lastUpdate,
                });
              }}
              color="primary"
            >
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNoteForm;
