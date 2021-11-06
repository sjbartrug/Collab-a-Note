import React from "react";
import ReactDom from "react-dom";

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import CardItem from "../CardItem";

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

it("renders course when null without crashing", () => {
  render(<CardItem course={null} />, container);
});

it("renders course correctly", () => {
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

  act(() => {
    render(<CardItem course={course} />, container);
  });

  const text = `${course.name}${course.teacher}`;

  expect(container.textContent).toBe(text);
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"card-item-container card\\">
      <div>
        <div class=\\"card-item-image-container\\"><img class=\\"card-img-top card-item-image\\" src=\\"https://i.pinimg.com/originals/be/96/a1/be96a12fe9f5fd8eaae8518455b4b6a3.png\\">
          <div class=\\"loading-icon\\"></div>
        </div>
        <div class=\\"card-body\\">
          <div class=\\"card-item-title card-title h5\\">Test course</div>
          <div class=\\"card-subtitle card-subtitle h6\\">Test teacher</div>
        </div>
      </div>
    </div>"
  `);
});
