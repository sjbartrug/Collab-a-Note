import React, { useContext, useEffect } from "react";
import DashBoardPageBody from "./DashBoardPageBody";
import DashBoardPageHeader from "./DashBoardPageHeader";
import "../../styles/DashBoard.css";
import { CourseContext } from "../../context/CourseContext";
import { getCourses } from "../../../controller/course";
import { useAuth } from "../../context/AuthContext";

const DashBoardPageContent = () => {
  const [courses, setCourses] = useContext(CourseContext);

  const { currentUser } = useAuth();

  useEffect(() => {
    getCourses(currentUser.uid, (response) => {
      if (response.status) {
        setCourses(response.data);
      } else {
        //Handle Error
        setCourses([]);
        alert(response.message);
      }
    });
  }, []);

  if (!courses) return null;
  return (
    <div className="dashboard-page-container">
      <DashBoardPageHeader />
      {/* {courses} */}
      <DashBoardPageBody />
    </div>
  );
};

export default DashBoardPageContent;
