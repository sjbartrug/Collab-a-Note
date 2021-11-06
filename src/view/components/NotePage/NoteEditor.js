import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { propTypes } from "react-bootstrap/esm/Image";
import {
  updateNote,
  onChangeNote,
  getSingleNote,
} from "../../../controller/note";

const NoteEditor = (props) => {
  const [note, setNote] = useState({});

  const onEditorChange = (content) => {
    const updatedNote = {
      ...note,
      content,
    };
    onChangeNote(updatedNote);

    setNote(updatedNote);
  };

  const saveNote = () => {
    updateNote((response) => {
      if (!response.status) {
        alert("response.message");
        //Handle Error
      }
    });
  };

  useEffect(() => {
    getSingleNote(props.noteId, (response) => {
      if (response.status) {
        console.log(response.data);
        setNote(response.data);
      } else {
        alert(response.message);
        //Handle Error
      }
    });
  }, []);

  if (!note) return null;

  return (
    <div>
      <div>
        <Editor
          apiKey="3ki3s2vgpnwgdgsz9hijujj9u4683mukery5oki29jnxhtgz"
          initialValue={note.content}
          value={note.content}
          onEditorChange={(content, editor) => {
            onEditorChange(content);
          }}
          init={{
            height: "94vh",
            menubar: true,
            autosave_interval: "1s",
            save_onsavecallback: function () {
              saveNote();
            },
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount save autosave",
            ],
            toolbar:
              "formatselect| fontselect | bold italic underline| backcolor forecolor|\
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | undo redo | save",
          }}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
