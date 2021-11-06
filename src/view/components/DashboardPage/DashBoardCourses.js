import React, { useContext, useEffect, useState } from "react";
import CardItem from "./CardItem";
import "../../styles/DashBoard.css";
import { Link } from "react-router-dom";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Height } from "@material-ui/icons";
import { CourseContext } from "../../context/CourseContext";
import AddCourseForm from "./AddCourseForm";
import {
  addCourse,
  addUserToCourse,
  deleteCourse,
  updateCourse,
  uploadCoverImage,
  deleteCourseInvitation,
} from "../../../controller/course";
import { useHistory } from "react-router-dom";
import moment from "moment";
import EditCourseForm from "./EditCourseForm";
import { useAuth } from "../../context/AuthContext";
import { getSingleUser } from "../../../controller/auth";
import { getCourseInvitations } from "../../../controller/course";
import Invitation from "./Invitation";

const DashBoardCourses = (props) => {
  const [courses, setCourses] = useContext(CourseContext);
  const [invitations, setInvitations] = useState([]);

  const [focusCourse, setFocusCourse] = useState(null);

  const history = useHistory();

  const [addCourseForm, setAddCourseForm] = useState(false);

  const { currentUser } = useAuth();
  const [customUser, setCustomUser] = useState();

  const [isAdding, setIsAdding] = useState(false);

  const addCourseIconStyle = {
    margin: 0,
    width: "80px",
    height: "80px",
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  const moveToNotePage = (course) => {
    history.push(`/dashboard/course/${course.id}`, course);
  };

  const handleAddCourse = (newCourse) => {
    setIsAdding(true);
    addCourse(newCourse, (response) => {
      setIsAdding(false);
      if (response.status) {
        setCourses((prevCourse) => [...prevCourse, newCourse]);
      } else {
        //Handle Error
      }
      setAddCourseForm(false);
    });
  };

  const handleDeleteCourse = (courseId) => {
    deleteCourse(courseId, (response) => {
      if (response.status) {
        setCourses(courses.filter((course) => course.id != courseId));
      } else {
        alert(response.message);
      }
    });
  };

  const handleUpdateCourse = (updatedCourse) => {
    setIsAdding(true);
    updateCourse(updatedCourse, (response) => {
      setIsAdding(false);
      setFocusCourse(null);
      if (response.status) {
        setCourses(
          courses.map((course) => {
            if (course.id === updatedCourse.id) {
              return updatedCourse;
            }
            return course;
          })
        );
      } else {
        alert(response.message);
      }
    });
  };

  const handleUploadImage = (event, course, callback) => {
    if (event.target.files.length === 1) {
      uploadCoverImage(event.target.files[0], course, (response) => {
        callback();
        if (response.status) {
          const courseId = course.id;
          setCourses(
            courses.map((course) => {
              if (courseId === course.id) {
                return response.data;
              }
              return course;
            })
          );
        } else {
          alert(response.message);
        }
      });
    } else callback();
  };

  const handleAcceptInvite = (invitation) => {
    addUserToCourse(customUser, invitation, (response) => {
      if (response.status) {
        setInvitations(
          invitations.filter((invite) => invite.id != invitation.id)
        );
        setCourses([...courses, invitation.course]);
      } else {
        alert(response.message);
      }
    });
  };

  const handleDenyInvite = (invitation) => {
    deleteCourseInvitation(invitation.id, (response) => {
      if (response.status) {
        setInvitations(
          invitations.filter((invite) => invite.id != invitation.id)
        );
      } else {
        alert(response.message);
      }
    });
  };

  useEffect(() => {
    getSingleUser(currentUser.uid, (response) => {
      if (response.status) {
        setCustomUser(response.data);
      } else {
        alert(response.message);
      }
    });
  }, []);

  useEffect(() => {
    getCourseInvitations(currentUser.email, (response) => {
      if (response.status) {
        setInvitations(response.data);
      } else {
        alert(response.message);
      }
    });
  }, []);

  if (!customUser) return null;

  return (
    <div>
      <h1 className="dashboard-body-title">Courses</h1>
      <div className="invitations-container">
        {invitations.map((invitation) => (
          <Invitation
            invite={invitation}
            onAcceptClick={() => handleAcceptInvite(invitation)}
            onDenyClick={() => handleDenyInvite(invitation)}
          />
        ))}
      </div>
      <Fab
        color="primary"
        aria-label="add"
        style={addCourseIconStyle}
        onClick={() => setAddCourseForm(true)}
      >
        <AddIcon />
      </Fab>
      <AddCourseForm
        isAdding={isAdding}
        currentUser={customUser}
        formStatus={addCourseForm}
        handleClose={() => setAddCourseForm(false)}
        addCourse={(newCourse) => handleAddCourse(newCourse)}
      />

      {focusCourse != null ? (
        <EditCourseForm
          isEditing={isAdding}
          course={focusCourse}
          handleClose={() => setFocusCourse(null)}
          updateCourse={(updatedCourse) => handleUpdateCourse(updatedCourse)}
        />
      ) : null}

      <div className="row dashboard-course-container">
        {courses.map((course, index) => (
          <CardItem
            key={index}
            className="col-lg-3 col-md-6, col-sm-12"
            course={course}
            onClick={() => {
              moveToNotePage(course);
            }}
            openEditForm={() => setFocusCourse(course)}
            deleteCourse={(courseId) => handleDeleteCourse(courseId)}
            uploadImage={(event, currentCourse, callback) => {
              handleUploadImage(event, currentCourse, callback);
            }}
            isOwner={customUser.id === course.owner.id}
          />
        ))}
      </div>
    </div>
  );
};

export default DashBoardCourses;
