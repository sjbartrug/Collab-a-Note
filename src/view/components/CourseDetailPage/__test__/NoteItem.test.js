import React from "react";
import ReactDom from "react-dom";
import NoteItem from "../NoteItem";

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

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

it("renders note item when null without crashing", () => {
  render(<NoteItem note={null} />, container);
});

it("Note renders correctly", () => {
  const note = {
    id: "123123",
    lastUpdate: new Date(),
    creationDate: new Date(),
    courseId: "323232",
    title: "This is a test",
    ownerId: "111",
    content: "This is a test note",
    owner: {
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/collab-a-note.appspot.com/o/avatars%2Fdefault-profile-user.png?alt=media&token=89dedd5a-f22e-452e-a212-44b307549305",
      email: "test@test.com",
      id: "111",
      username: "TEST",
    },
  };

  act(() => {
    render(<NoteItem note={note} />, container);
  });

  const text = `${note.title}created ${note.creationDate.toLocaleDateString(
    "en-US"
  )}last updated ${note.lastUpdate.toLocaleDateString("en-US")}`;

  expect(container.textContent).toBe(text);

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"note-item-container\\">
      <div>
        <h3 data-testid=\\"title\\">This is a test</h3>
        <p data-testid=\\"creation-date\\">created 11/22/2020</p>
        <p data-testid=\\"last-update\\">last updated 11/22/2020</p>
      </div>
      <div class=\\"note-buttons-container\\"><button class=\\"MuiButtonBase-root MuiIconButton-root\\" tabindex=\\"0\\" type=\\"button\\" style=\\"width: 40px; height: 40px; margin: 5px;\\"><span class=\\"MuiIconButton-label\\"><svg class=\\"MuiSvgIcon-root\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\"><path d=\\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\\"></path></svg></span><span class=\\"MuiTouchRipple-root\\"></span></button><button class=\\"MuiButtonBase-root MuiIconButton-root\\" tabindex=\\"0\\" type=\\"button\\" data-testid=\\"edit-button\\" style=\\"width: 40px; height: 40px; margin: 5px;\\"><span class=\\"MuiIconButton-label\\"><svg class=\\"MuiSvgIcon-root\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\"><path d=\\"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\\"></path></svg></span><span class=\\"MuiTouchRipple-root\\"></span></button></div>
      <hr>
    </div>"
  `);
});
