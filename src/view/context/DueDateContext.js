import React, { useState, createContext } from "react";

export const DueDateContext = createContext();

export const DueDateProvider = (props) => {
  const [dueDates, setDueDates] = useState([]);

  return (
    <DueDateContext.Provider value={[dueDates, setDueDates]}>
      {props.children}
    </DueDateContext.Provider>
  );
};
