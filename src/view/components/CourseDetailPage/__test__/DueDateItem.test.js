import React from "react";
import ReactDom from "react-dom";

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import DueDateItem from "../DueDateItem";

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

it("renders due date when null without crashing", () => {
  render(<DueDateItem dueDate={null} />, container);
});

it("renders due date correctly", () => {
  const dueDate = {
    id: "123",
    title: "Exam 1",
    deadline: new Date("12/20/2020"),
  };

  act(() => {
    render(<DueDateItem dueDate={dueDate} />, container);
  });
  const text = `${dueDate.title}${dueDate.deadline}`;

  expect(container.textContent).toBe(text);

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"due-date-item-container\\">
      <h2 class=\\"due-date-item-title\\"><span>Exam 1</span></h2>
      <h4 class=\\"due-date-item-date\\">Sun Dec 20 2020 00:00:00 GMT-0600 (Central Standard Time)</h4>
      <div class=\\"due-date-item-button\\"><button class=\\"MuiButtonBase-root MuiIconButton-root\\" tabindex=\\"0\\" type=\\"button\\" style=\\"width: 30px; height: 30px; margin: 5px;\\"><span class=\\"MuiIconButton-label\\"><svg class=\\"MuiSvgIcon-root\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\"><path d=\\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\\"></path></svg></span><span class=\\"MuiTouchRipple-root\\"></span></button></div>
    </div>"
  `);
});
