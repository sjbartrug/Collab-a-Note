import React, { useState, createContext } from "react";

export const NoteContext = createContext();

export const NoteProvider = (props) => {
  const [notes, setNotes] = useState([]);

  return (
    <NoteContext.Provider value={[notes, setNotes]}>
      {props.children}
    </NoteContext.Provider>
  );
};
