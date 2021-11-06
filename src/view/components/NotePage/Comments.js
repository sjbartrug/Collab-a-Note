import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { Button, Fab, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddCommentForm from "./AddCommentForm";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../../../controller/comment";
import { useAuth } from "../../context/AuthContext";
import { getSingleUser } from "../../../controller/auth";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [addCommentForm, setAddCommentForm] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { currentUser } = useAuth();
  const [customUser, setCustomUser] = useState();

  const addCommentIconStyle = {
    width: "50px",
    height: "50px",
  };

  const handleAddComment = (comment) => {
    setIsAdding(true);
    addComment(comment, (response) => {
      setIsAdding(false);
      setAddCommentForm(false);
      if (response.status) {
        setComments((prevComments) => [...prevComments, comment]);
      } else {
        alert(response.message);
      }
    });
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId, (response) => {
      if (response.status) {
        setComments(comments.filter((comment) => commentId !== comment.id));
      } else {
        alert(response.message);
      }
    });
  };

  useEffect(() => {
    getComments(props.noteId, (response) => {
      if (response.status) {
        setComments(response.data);
      } else {
        alert(response.message);
      }
    });
  }, []);

  useEffect(() => {
    getSingleUser(currentUser.uid, (response) => {
      if (response.status) {
        setCustomUser(response.data);
      } else {
        alert(response.message);
      }
    });
  }, []);

  if (!customUser) return null;

  return (
    <div className="comments-container">
      <div className="comments-title-container">
        <h3 className="comments-title">Comments</h3>
        <div className="comments-button">
          <IconButton
            onClick={() => {
              setAddCommentForm(true);
            }}
            style={addCommentIconStyle}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>

      <AddCommentForm
        isAdding={isAdding}
        currentUser={customUser}
        noteId={props.noteId}
        formStatus={addCommentForm}
        handleClose={() => setAddCommentForm(false)}
        addComment={(comment) => handleAddComment(comment)}
      />
      {comments.map((comment, index) => (
        <CommentItem
          key={index}
          comment={comment}
          onClickDelete={(commentId) => {
            handleDeleteComment(commentId);
          }}
        />
      ))}
    </div>
  );
};

export default Comments;
