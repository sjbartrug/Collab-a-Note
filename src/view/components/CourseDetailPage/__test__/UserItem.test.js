import React from "react";
import ReactDom from "react-dom";

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import UserItem from "../UserItem";

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

it("renders user when null without crashing", () => {
  render(<UserItem user={null} />, container);
});

it("renders user correctly", () => {
  const user = {
    id: "123",
    username: "test username",
    email: "test@test.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/collab-a-note.appspot.com/o/avatars%2Fdefault-profile-user.png?alt=media&token=89dedd5a-f22e-452e-a212-44b307549305",
  };

  act(() => {
    render(<UserItem user={user} />, container);
  });

  const text = `${user.username}${user.email}`;

  expect(container.textContent).toBe(text);

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"user-item-container\\"><img class=\\"user-image\\" src=\\"https://firebasestorage.googleapis.com/v0/b/collab-a-note.appspot.com/o/avatars%2Fdefault-profile-user.png?alt=media&amp;token=89dedd5a-f22e-452e-a212-44b307549305\\" alt=\\"Avatar\\">
      <div>
        <h4 class=\\"user-item-name\\">test username</h4>
        <h4 class=\\"user-item-email\\">test@test.com</h4>
      </div><button class=\\"MuiButtonBase-root MuiIconButton-root\\" tabindex=\\"0\\" type=\\"button\\"><span class=\\"MuiIconButton-label\\"><svg class=\\"MuiSvgIcon-root\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\"><path d=\\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\\"></path></svg></span><span class=\\"MuiTouchRipple-root\\"></span></button>
    </div>"
  `);
});
