import React from "react";

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import CardItem from "../CardItem";
import Invitation from "../Invitation";

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

it("renders invitation when null without crashing", () => {
  render(<Invitation invite={null} />, container);
});

it("renders invitation correctly", () => {
  const user = {
    id: "123",
    username: "test username",
    email: "test@test.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/collab-a-note.appspot.com/o/avatars%2Fdefault-profile-user.png?alt=media&token=89dedd5a-f22e-452e-a212-44b307549305",
  };

  const course = {
    id: "123",
    name: "Test course",
    ownerId: user.id,
    teacher: "Test teacher",
    courseCode: "101",
    owner: user,
    creationDate: new Date(),
    lastUpdate: new Date(),
    coverImg:
      "https://i.pinimg.com/originals/be/96/a1/be96a12fe9f5fd8eaae8518455b4b6a3.png",
    accessUsers: [user.id],
    accessUsersObj: [user],
  };

  const invite = {
    id: "123",
    from: user,
    to: "test@test.com",
    course: course,
  };

  act(() => {
    render(<Invitation invite={invite} />, container);
  });

  const inviteText = document.querySelector("[data-testid=invite-text]")
    .innerHTML;

  expect(inviteText).toBe(
    `${invite.from.username} invites you to ${invite.course.name} course`
  );

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"invitation-container\\">
      <h4 data-testid=\\"invite-text\\">test username invites you to Test course course</h4>
      <div class=\\"invitation-buttons-container\\"><button class=\\"MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary\\" tabindex=\\"0\\" type=\\"button\\" style=\\"margin: 10px 20px 0px;\\" data-testid=\\"accept-button\\"><span class=\\"MuiButton-label\\">Accept</span><span class=\\"MuiTouchRipple-root\\"></span></button><button class=\\"MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textSecondary\\" tabindex=\\"0\\" type=\\"button\\" style=\\"margin: 10px 20px 0px;\\" data-testid=\\"deny-button\\"><span class=\\"MuiButton-label\\">Deny</span><span class=\\"MuiTouchRipple-root\\"></span></button></div>
    </div>"
  `);
});
