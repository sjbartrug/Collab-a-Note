import React, { useState } from "react";
import UserImage from "../shared/UserImage";
import MoreUsers from "./MoreUsers";

import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddUsersForm from "./AddUsersForm";
import { getSingleUserByEmail } from "../../../controller/auth";
import { addCourseInvitations } from "../../../controller/course";
import { propTypes } from "react-bootstrap/esm/Image";
import AddNoteForm from "./AddNoteForm";

const SharedUsers = (props) => {
  const [addUsersForm, setAddUsersForm] = useState(false);

  const handleFindUser = (email, callback) => {
    getSingleUserByEmail(email, (response) => {
      if (response.status) {
        callback(response.data);
      } else {
        callback(null);
        alert(response.message);
      }
    });
  };

  const handleSendInvites = (invitations, callback) => {
    addCourseInvitations(invitations, (response) => {
      callback(response.status);
    });
  };

  return (
    <div className="shared-users-container">
      <h1 className="detail-subtitle">Shared with</h1>
      <div className="shared-list">
        {props.course.accessUsersObj.map((user) => (
          <UserImage imgUrl={user.avatar} />
        ))}
        <IconButton onClick={() => setAddUsersForm(true)}>
          <AddIcon />
        </IconButton>
        <AddUsersForm
          formStatus={addUsersForm}
          handleClose={() => setAddUsersForm(false)}
          findUser={handleFindUser}
          sendInvites={handleSendInvites}
          course={props.course}
          user={props.user}
        />
      </div>
    </div>
  );
};

export default SharedUsers;
