import React, { useContext, useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { getSingleUser } from "../../../controller/auth";
import { DueDateContext } from "../../context/DueDateContext";

const DueDatesHomePage = (props) => {
  const { currentUser } = useAuth();
  const [dueDates, setDueDates] = useContext(DueDateContext);
  const [customUser, setCustomUser] = useState();

  const history = useHistory();

  // const moveToAssignmentPage = (dueDate) => {
  //   history.push(`/${dueDate.id}`, dueDate);
  // };

  const moveToCoursePage = (dueDate) => {
    history.push(`/dashboard/course/${dueDate.courseId}`, dueDate);
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

  return (
    <section className="dueDateList">
      <Row className="recent-notes-title">
        <h1>Upcoming Assignments</h1>
      </Row>
      <ListGroup variant="flush">
        {dueDates.map((dueDate, index) => {
          return (
            <ListGroupItem
              key={index}
              dueDate={dueDate}
              onClick={() => {
                // moveToNotePage(dueDate);
              }}
            >
              <div className="dueDate">
                <h2>{dueDate.title}</h2>
                <h4 onClick={() => moveToCoursePage(dueDate)}>
                  {dueDate.course_name}
                </h4>
                <h6>{dueDate.deadline.toDate().toDateString()}</h6>
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </section>
  );
};

export default DueDatesHomePage;
