import React, { useContext, useEffect, useState } from "react";
import Notes from "../components/CourseDetailPage/Notes";
import DueDates from "../components/CourseDetailPage/DueDates";
import SharedUsers from "../components/CourseDetailPage/SharedUsers";
import "../styles/CourseDetail.css";
import { getSingleUser } from "../../controller/auth";
import { useAuth } from "../context/AuthContext";

const CourseDetailPage = (props) => {
  const [course, setCourse] = useState();
  const [customUser, setCustomUser] = useState();
  const { currentUser } = useAuth();

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
    setCourse(props.location.state);
  }, []);

  if (!course) return null;

  if (!customUser) return null;

  return (
    <div className="detail-container">
      <h1 className="detail-title">{course.name}</h1>
      <SharedUsers course={course} user={customUser} />
      <div className="row">
        <div className="col-md-8">
          <Notes course={course} user={customUser} />
        </div>
        <div className="col-md-4">
          <DueDates course={course} user={customUser} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
