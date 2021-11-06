import React, {useState, createContext} from 'react';

export const CourseContext = createContext();


export const CourseProvider = (props) => {
    const [courses, setCourses] = useState([])


    return(
        <CourseContext.Provider value={[courses, setCourses]}>
            {props.children}
        </CourseContext.Provider>
    );
}