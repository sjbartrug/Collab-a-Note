import React, { useContext, useEffect, useState } from "react";
import { CardDeck } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import {
  addCourse,
  addUserToCourse,
  deleteCourse,
  updateCourse,
  uploadCoverImage,
  deleteCourseInvitation,
} from "../../../controller/course";
import { db } from "../../../controller/api/firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCourses } from "../../../controller/course";
import { getSingleUser } from "../../../controller/auth";
import { CourseContext } from "../../context/CourseContext";
import AddCourseForm from "../DashboardPage/AddCourseForm";
import CardItem from "../DashboardPage/CardItem";

const CourseListHomePage = (props) => {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useContext(CourseContext);
  const [addCourseForm, setAddCourseForm] = useState(false);
  const [customUser, setCustomUser] = useState();
  const [focusCourse, setFocusCourse] = useState(null);

  const history = useHistory();

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

  const handleDeleteCourse = (courseId) => {
    deleteCourse(courseId, (response) => {
      if (response.status) {
        setCourses(courses.filter((course) => course.id != courseId));
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

  const handleAddCourse = (newCourse) => {
    addCourse(newCourse, (response) => {
      if (response.status) {
        setCourses((prevCourse) => [...prevCourse, newCourse]);
      } else {
        //Handle Error
      }
      setAddCourseForm(false);
    });
  };

  useEffect(() => {
    getCourses(currentUser.uid, (response) => {
      if (response.status) {
        setCourses(response.data);
      } else {
        alert(response.message);
      }
    });
  }, []);

  useEffect(() => {
    getSingleUser(currentUser.uid, (response) => {
      if (response.status) {
        setCustomUser(response.data);
      } else {
        alert(response.message);
      }
    });
  }, []);

  if (!customUser) return <div>You are not enrolled in any classes</div>;

  return (
    <div>
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
      <Fab
        color="primary"
        aria-label="add"
        style={addCourseIconStyle}
        onClick={() => setAddCourseForm(true)}
      >
        <AddIcon />
      </Fab>
      <AddCourseForm
        currentUser={customUser}
        formStatus={addCourseForm}
        handleClose={() => setAddCourseForm(false)}
        addCourse={(newCourse) => handleAddCourse(newCourse)}
      />
    </div>
  );
};

export default CourseListHomePage;
