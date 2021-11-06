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

const EditCourseForm = (props) => {
  const [course, setCourse] = useState(props.course);

  const getCurrentTime = () => {
    return new Date();
  };

  const handleCourseNameChange = (event) => {
    setCourse({
      ...course,
      name: event.target.value,
    });
  };

  const handleCourseCodeChange = (event) => {
    setCourse({
      ...course,
      courseCode: event.target.value,
    });
  };

  const handleCourseTeacherChange = (event) => {
    setCourse({
      ...course,
      teacher: event.target.value,
    });
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update course</DialogTitle>
        <DialogContent>
          <DialogContentText>Update your course.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Course name*"
            value={course.name}
            type="text"
            fullWidth
            onChange={(e) => handleCourseNameChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={course.courseCode}
            label="Course code"
            type="text"
            fullWidth
            onChange={(e) => handleCourseCodeChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={course.teacher}
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
          {props.isEditing ? (
            <CircularProgress />
          ) : (
            <Button
              disabled={course.name === ""}
              onClick={() => {
                props.updateCourse(course);
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

export default EditCourseForm;
