import React, { useContext, useEffect } from 'react';
import DashBoardPageBody from '../components/DashboardPage/DashBoardPageBody';
import DashBoardPageHeader from '../components/DashboardPage/DashBoardPageHeader';
import "../styles/DashBoard.css"
import {CourseContext, CourseProvider} from "../context/CourseContext";
import { getClases } from "../../controller/note"
import DashBoardPageContent from '../components/DashboardPage/DashBoardPageContent';

const DashboardPage = () => {

    return(
        <CourseProvider>
            <DashBoardPageContent/>
        </CourseProvider>
    )
}

export default DashboardPage