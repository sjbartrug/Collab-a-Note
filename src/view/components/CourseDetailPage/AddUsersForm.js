import { Search } from "@material-ui/icons/";
import React, { useState } from "react";

import { CircularProgress } from "@material-ui/core";
import UserItem from "./UserItem";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@material-ui/core";

const AddUsersForm = (props) => {
  const searchIconStyle = {
    width: "30px",
    height: "30px",
  };

  const [users, setUsers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const checkDuplicateUser = (email) => {
    for (let i = 0; i < users.length; i++) {
      if (email === users[i].email) {
        return true;
      }
    }

    return false;
  };

  const checkAlreadyJoinedUser = (id, accessUsers) => {
    console.log(id, accessUsers);
    for (let i = 0; i < accessUsers.length; i++) {
      if (accessUsers[i] === id) {
        return true;
      }
    }
    return false;
  };

  const inviteForm = {
    id: "",
    from: props.user,
    to: "",
    course: props.course,
  };

  return (
    <Dialog open={props.formStatus} fullWidth={true} maxWidth={"md"}>
      <DialogTitle>Add users</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Share this course with other users.{" "}
        </DialogContentText>
        <div className="add-users-form-search">
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter user's email"
            value={searchText}
            type="text"
            fullWidth
            onChange={handleSearchChange}
          />
          <div>
            {isSearching ? (
              <CircularProgress />
            ) : (
              <IconButton
                onClick={() => {
                  if (searchText === "") return;
                  if (checkDuplicateUser(searchText)) return;

                  setIsSearching(true);
                  props.findUser(searchText, (user) => {
                    setIsSearching(false);
                    if (
                      checkAlreadyJoinedUser(user.id, props.course.accessUsers)
                    ) {
                      alert("This user already joined");
                      return;
                    }

                    if (!user) return;
                    setUsers([...users, user]);
                    setInvitations([
                      ...invitations,
                      {
                        ...inviteForm,
                        id: uuidv4(),
                        to: user.email,
                      },
                    ]);
                  });
                }}
              >
                <Search style={searchIconStyle} />
              </IconButton>
            )}
          </div>
        </div>

        {users.map((user) => (
          <UserItem
            user={user}
            removeOnClick={({ id, email }) => {
              setUsers(users.filter((user) => user.id != id));
              setInvitations(
                invitations.filter((invite) => invite.to != email)
              );
            }}
          />
        ))}
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={props.handleClose}>
          Cancel
        </Button>
        {isAdding ? (
          <CircularProgress />
        ) : (
          <Button
            disabled={users.length === 0}
            color="primary"
            onClick={() => {
              setIsAdding(true);
              props.sendInvites(invitations, (result) => {
                setIsAdding(false);
                if (result) {
                  props.handleClose();
                }
              });
            }}
          >
            Add
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddUsersForm;
