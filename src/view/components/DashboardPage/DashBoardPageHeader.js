import React, { useContext } from "react";
import "../../styles/DashBoard.css";
import { CourseContext } from "../../context/CourseContext";
import { getCourses } from "../../../controller/course";

const DashBoardPageHeader = () => {
  const [courses, setCourses] = useContext(CourseContext);

  return (
    <div className="dashboard-page-header-container">
      <img
        className="header-image"
        src="https://www.designyourway.net/blog/wp-content/uploads/2018/08/6853035-fall-leaves-background.jpg"
        alt=""
      />

      <div className="title">
        <h2>Welcome to Fall 2020</h2>
        <p>You have {courses.length} courses</p>
      </div>
    </div>
  );
};

export default DashBoardPageHeader;
