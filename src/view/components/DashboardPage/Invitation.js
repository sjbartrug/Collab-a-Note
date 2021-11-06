import { Button } from "@material-ui/core";
import React from "react";

const Invitation = (props) => {
  const buttonStyle = {
    margin: "10px 20px 0",
  };

  if (!props.invite) return null;

  return (
    <div className="invitation-container">
      <h4 data-testid="invite-text">
        {props.invite.from.username} invites you to {props.invite.course.name}{" "}
        course
      </h4>
      <div className="invitation-buttons-container">
        <Button
          style={buttonStyle}
          onClick={props.onAcceptClick}
          color="primary"
          data-testid="accept-button"
        >
          Accept
        </Button>
        <Button
          style={buttonStyle}
          color="secondary"
          onClick={props.onDenyClick}
          data-testid="deny-button"
        >
          Deny
        </Button>
      </div>
    </div>
  );
};

export default Invitation;
