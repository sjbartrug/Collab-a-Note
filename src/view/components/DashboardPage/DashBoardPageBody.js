import React from "react";
import "../../styles/DashBoard.css";

import DashBoardCourses from "./DashBoardCourses";

const DashBoardPageBody = () => {
  return (
    <div className="dashboard-body">
      <DashBoardCourses />
    </div>
  );
};

export default DashBoardPageBody;
