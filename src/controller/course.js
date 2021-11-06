import { db, storage, apiResponse } from "./api/firebase";

const addCourse = (newCourse, callback) => {
  console.log(newCourse);
  db.collection("courses")
    .doc(newCourse.id)
    .set(newCourse)
    .then(function () {
      console.log("Add course sucessfully!");
      callback(apiResponse(true, "Add course successfully.", null));
    })
    .catch(function (error) {
      console.error("Error when adding course: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const getCourses = (userid, callback) => {
  db.collection("courses")
    .where("accessUsers", "array-contains", userid)
    .get()
    .then(function (querySnapshot) {
      let courses = [];
      querySnapshot.forEach(function (doc) {
        var course = doc.data();
        course.creationDate = course.creationDate.toDate();
        course.lastUpdate = course.lastUpdate.toDate();
        courses.push(course);
      });
      callback(apiResponse(true, "Getting course sucessfully.", courses));
    })
    .catch(function (error) {
      console.error("Error when getting courses: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const deleteCourse = (courseId, callback) => {
  db.collection("courses")
    .doc(courseId)
    .delete()
    .then(function () {
      console.log("Delete course sucessfully!");
      callback(apiResponse(true, "Delete course successfully.", null));
    })
    .catch(function (error) {
      console.error("Error when deleting course: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const updateCourse = (updatedCourse, callback) => {
  db.collection("courses")
    .doc(updatedCourse.id)
    .set(updatedCourse)
    .then(function () {
      console.log("Update course sucessfully!");
      callback(apiResponse(true, "Update course successfully.", updatedCourse));
    })
    .catch(function (error) {
      console.error("Error when updating course: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const addUserToCourse = (user, invitation, callback) => {
  invitation.course.accessUsers = [...invitation.course.accessUsers, user.id];
  invitation.course.accessUsersObj = [
    ...invitation.course.accessUsersObj,
    user,
  ];

  updateCourse(invitation.course, (response) => {
    if (response.status) {
      deleteCourseInvitation(invitation.id, (response) => {
        if (response.status) {
          callback(apiResponse(true, "Add user to course sucessfully.", null));
        } else {
          callback(
            apiResponse(false, "Error when adding user to course", null)
          );
        }
      });
    }
  });
};

const addCourseInvitations = (invitations, callback) => {
  const batch = db.batch();

  for (let i = 0; i < invitations.length; i++) {
    const invite = invitations[i];
    console.log(invite);
    const ref = db.collection("invitations").doc(invite.id);
    batch.set(ref, invite);
  }

  batch
    .commit()
    .then(() => {
      console.log("Add invitations sucessfully!");
      callback(apiResponse(true, "Sent invitation successfully.", null));
    })
    .catch((error) => {
      console.error("Error when adding invitation: ", error);
      callback(apiResponse(false, "Can't send an invite", null));
    });
};

const getCourseInvitations = (email, callback) => {
  db.collection("invitations")
    .where("to", "==", email)
    .get()
    .then(function (querySnapshot) {
      let invitations = [];
      querySnapshot.forEach(function (doc) {
        var invite = doc.data();
        invitations.push(invite);
      });
      callback(
        apiResponse(true, "Getting invitations sucessfully.", invitations)
      );
    })
    .catch(function (error) {
      console.error("Error when getting invitations: ", error);
      callback(
        apiResponse(false, "There's some error when getting invitations", null)
      );
    });
};

const deleteCourseInvitation = (invitationId, callback) => {
  db.collection("invitations")
    .doc(invitationId)
    .delete()
    .then(function () {
      console.log("Delete invitation sucessfully!");
      callback(apiResponse(true, "Delete invitation successfully.", null));
    })
    .catch(function (error) {
      console.error("Error when deleting invitation: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const uploadCoverImage = (file, course, callback) => {
  console.log(file, course);
  var uploadTask = storage.ref().child(`courses/images/${file.name}`).put(file);

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    function (error) {
      callback(
        apiResponse(false, `Error when uploading image: ${error.message}`, null)
      );
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at", downloadURL);
        console.log(course);
        course.coverImg = downloadURL;
        updateCourse(course, callback);
      });
    }
  );
};

export {
  addCourse,
  getCourses,
  deleteCourse,
  updateCourse,
  uploadCoverImage,
  addUserToCourse,
  addCourseInvitations,
  getCourseInvitations,
  deleteCourseInvitation,
};
