import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";

const DueDateItem = (props) => {
  const isBefore = (date) => {
    return new Date().getTime() > date.getTime();
  };
  const dueDateButtonsStyle = {
    width: "30px",
    height: "30px",
    margin: "5px",
  };

  if (!props.dueDate) return null;

  return (
    <div className="due-date-item-container">
      <h2 className="due-date-item-title">
        <span>{props.dueDate.title}</span>
        {isBefore(props.dueDate.deadline) ? (
          <span className="past-title"> (past)</span>
        ) : null}
      </h2>
      <h4 className="due-date-item-date">
        {props.dueDate.deadline.toString()}
      </h4>
      <div className="due-date-item-button">
        {props.isOwner ? (
          <IconButton
            onClick={() => {
              props.deleteDueDate(props.dueDate.id);
            }}
            style={dueDateButtonsStyle}
          >
            <Delete />
          </IconButton>
        ) : null}
      </div>
    </div>
  );
};

export default DueDateItem;
