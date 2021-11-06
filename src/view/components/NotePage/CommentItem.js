import React from "react";
import UserImage from "../shared/UserImage";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons/";

const CommentItem = (props) => {
  const deleteButtonStyle = {
    width: "30px",
    height: "30px",
    margin: "5px",
  };

  if (!props.comment) return null;
  return (
    <div className="row">
      <div className="col-lg-1 col-md-0">
        <UserImage imgUrl={props.comment.author.avatar} />
      </div>

      <div className="col-lg-11 col-md-12">
        <div className="comment-content-container">
          <p data-testid="comment-username" className="comment-username">
            {props.comment.author.username}
          </p>
          <p
            data-testid="comment-creation-date"
            className="comment-creation-date"
          >
            {props.comment.creationDate.toLocaleDateString("en-US")}
          </p>
          <p data-testid="comment-content" className="comment-content">
            {props.comment.content}
          </p>
          <div className="comment-buttons">
            {props.isOwner ? (
              <IconButton
                onClick={() => {
                  props.onClickDelete(props.comment.id);
                }}
                style={deleteButtonStyle}
              >
                <Delete />
              </IconButton>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
