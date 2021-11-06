// import React, { useContext, useEffect, useState } from "react";
// import { ListGroup, ListGroupItem } from "react-bootstrap";
// import { Row } from "react-bootstrap";
// import IconButton from "@material-ui/core/IconButton";
// import AddIcon from "@material-ui/icons/Add";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import FormHelperText from "@material-ui/core/FormHelperText";

// import DialogTitle from "@material-ui/core/DialogTitle";
// import Selection from "../CleanUp/InputSelector";

// import { db } from "../../../controller/api/firebase";
// import { useAuth } from "../../context/AuthContext";
// import { useHistory } from "react-router-dom";
// import { getSingleUser } from "../../../controller/auth";
// import { addDueDate, deleteDueDate } from "../../../controller/dueDate";
// import { DueDateContext } from "../../context/DueDateContext";

// const AddDueDateForm = (props) => {
//   const [open, setOpen] = useState(props.formStatus);

//   return (
//     <div>
//       <Dialog
//         open={props.formStatus}
//         onClose={props.handleClose}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle id="due-date-form-dialog-title">
//           New Assignment
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Title"
//             type="email"
//             fullWidth
//           />
//           <TextField
//             id="course_select"
//             label="Course"
//             fullWidth
//             m={10}
//             p={10}
//             select
//             textFieldProps={{
//               label: "Label",
//               InputLabelProps: {
//                 shrink: true,
//               },
//             }}
//           >
//             <Selection collection={"courses"} />
//           </TextField>
//           <TextField
//             id="deadline-input"
//             type="datetime-local"
//             label=" "
//             className="deadline-entry"
//             m={10}
//             p={10}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <FormHelperText id="standard-Deadline-helper-text">
//             Deadline
//           </FormHelperText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default AddDueDateForm;
