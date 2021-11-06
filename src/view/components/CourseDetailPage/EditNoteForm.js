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
import { CircularProgress } from "@material-ui/core";

const EditNoteForm = (props) => {
  const [note, setNote] = useState(props.note);

  const handleTitleChange = (event) => {
    setNote({
      ...note,
      title: event.target.value,
    });
  };
  return (
    <div>
      <Dialog
        open={true}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="form-dialog-title">Change note title</DialogTitle>
        <DialogContent>
          <DialogContentText>Add note title</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            value={note.title}
            type="text"
            fullWidth
            onChange={(e) => handleTitleChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>

          {props.isEditing ? (
            <CircularProgress />
          ) : (
            <Button
              disabled={note.title == ""}
              onClick={() => {
                props.editNote(note);
              }}
              color="primary"
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditNoteForm;
