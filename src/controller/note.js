import { db, apiResponse } from "./api/firebase";

const addNote = (newNote, callback) => {
  db.collection("notes")
    .doc(newNote.id)
    .set(newNote)
    .then(function () {
      console.log("Add note sucessfully!");
      callback(apiResponse(true, "Add note successfully.", null));
    })
    .catch(function (error) {
      console.error("Error when adding note: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const getNotes = (courseId, callback) => {
  db.collection("notes")
    .where("courseId", "==", courseId)
    .get()
    .then(function (querySnapshot) {
      let notes = [];
      querySnapshot.forEach(function (doc) {
        var note = doc.data();
        note.creationDate = note.creationDate.toDate();
        note.lastUpdate = note.lastUpdate.toDate();
        notes.push(note);
      });
      callback(apiResponse(true, "Getting notes sucessfully.", notes));
    })
    .catch(function (error) {
      console.error("Error when getting notes: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const getSingleNote = (noteId, callback) => {
  db.collection("notes")
    .where("id", "==", noteId)
    .get()
    .then(function (querySnapshot) {
      let notes = [];
      querySnapshot.forEach(function (doc) {
        var note = doc.data();
        note.creationDate = note.creationDate.toDate();
        note.lastUpdate = note.lastUpdate.toDate();
        notes.push(note);
      });
      callback(
        apiResponse(true, "Getting a single note sucessfully.", notes[0])
      );
    })
    .catch(function (error) {
      console.error("Error when getting a single note: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

let currentNote = {};

const onChangeNote = (newNote) => {
  currentNote = newNote;
};

const updateNote = (callback) => {
  currentNote.lastUpdate = new Date();

  db.collection("notes")
    .doc(currentNote.id)
    .set(currentNote)
    .then(function () {
      console.log("Edit note sucessfully!");
      callback(apiResponse(true, "Edit note successfully.", null));
    })
    .catch(function (error) {
      console.error("Error when editting note: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const deleteNote = (noteId, callback) => {
  db.collection("notes")
    .doc(noteId)
    .delete()
    .then(function () {
      console.log("Delete note sucessfully!");
      callback(apiResponse(true, "Delete note successfully.", null));
    })
    .catch(function (error) {
      console.error("Error when deleting note: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const updateNoteTitle = (updatedNote, callback) => {
  updatedNote.lastUpdate = new Date();
  db.collection("notes")
    .doc(updatedNote.id)
    .set(updatedNote)
    .then(function () {
      console.log("Update note title sucessfully!");
      callback(apiResponse(true, "Update note title successfully.", null));
    })
    .catch(function (error) {
      console.error("Error when updating note title: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

export {
  addNote,
  getNotes,
  getSingleNote,
  onChangeNote,
  updateNote,
  deleteNote,
  updateNoteTitle,
};
