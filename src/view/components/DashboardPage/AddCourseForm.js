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

const AddCourseForm = (props) => {
  const [newCourse, setNewCourse] = useState({
    id: "",
    name: "",
    ownerId: props.currentUser.id,
    teacher: "",
    courseCode: "",
    owner: props.currentUser,
    creationDate: "",
    lastUpdate: "",
    coverImg:
      "https://i.pinimg.com/originals/be/96/a1/be96a12fe9f5fd8eaae8518455b4b6a3.png",
    accessUsers: [props.currentUser.id],
    accessUsersObj: [props.currentUser],
  });

  const getCurrentTime = () => {
    return new Date();
  };

  const createNewCourseId = () => {
    const id = uuidv4();
    console.log(id);
    return id;
  };

  const handleCourseNameChange = (event) => {
    setNewCourse({
      ...newCourse,
      name: event.target.value,
    });
  };

  const handleCourseCodeChange = (event) => {
    setNewCourse({
      ...newCourse,
      courseCode: event.target.value,
    });
  };

  const handleCourseTeacherChange = (event) => {
    setNewCourse({
      ...newCourse,
      teacher: event.target.value,
    });
  };

  return (
    <div>
      <Dialog
        open={props.formStatus}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add course</DialogTitle>
        <DialogContent>
          <DialogContentText>Add course to your dashboard.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Course name*"
            type="text"
            fullWidth
            onChange={(e) => handleCourseNameChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Course code"
            type="text"
            fullWidth
            onChange={(e) => handleCourseCodeChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Course teacher"
            type="text"
            fullWidth
            onChange={(e) => handleCourseTeacherChange(e)}
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
              disabled={newCourse.name === ""}
              onClick={() => {
                const id = createNewCourseId();
                const creationDate = getCurrentTime();
                const lastUpdate = getCurrentTime();

                props.addCourse({
                  ...newCourse,
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

export default AddCourseForm;
