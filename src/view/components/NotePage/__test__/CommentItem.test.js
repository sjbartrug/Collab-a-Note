import React from "react";

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import CommentItem from "../CommentItem";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders comment when null without crashing", () => {
  render(<CommentItem invite={null} />, container);
});

it("renders comment correctly", () => {
  const user = {
    id: "123",
    username: "test username",
    email: "test@test.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/collab-a-note.appspot.com/o/avatars%2Fdefault-profile-user.png?alt=media&token=89dedd5a-f22e-452e-a212-44b307549305",
  };

  const comment = {
    id: "123",
    noteId: "abc",
    creationDate: new Date(),
    content: "This is a random content for testing",
    author: user,
  };

  act(() => {
    render(<CommentItem comment={comment} />, container);
  });

  const commentUsernameText = document.querySelector(
    "[data-testid=comment-username]"
  ).innerHTML;

  const commentContent = document.querySelector("[data-testid=comment-content]")
    .innerHTML;

  expect(commentUsernameText).toBe(`${user.username}`);
  expect(commentContent).toBe(`${comment.content}`);
});
