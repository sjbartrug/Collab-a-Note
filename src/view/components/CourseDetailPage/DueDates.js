import React, { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddDueDateForm from "./AddDueDateForm";
import {
  addDueDate,
  getDueDates,
  deleteDueDate,
} from "../../../controller/dueDate";
import DueDateItem from "./DueDateItem";

const DueDates = (props) => {
  const [dueDates, setDueDates] = useState([]);
  const [addDueDateForm, setAddDueDateForm] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const addDueDateIconStyle = {
    marginRight: "30px",
    width: "50px",
    height: "50px",
    top: "0",
    right: "0",
    bottom: 0,
    left: "auto",
    position: "absolute",
  };

  const handleAddDueDate = (dueDate) => {
    setIsAdding(true);
    addDueDate(dueDate, (response) => {
      setIsAdding(false);
      if (response.status) {
        setDueDates((prevDueDates) => [dueDate, ...prevDueDates]);
      } else {
        alert(response.message);
      }

      setAddDueDateForm(false);
    });
  };

  const handleDeleteDueDate = (dueDateId) => {
    deleteDueDate(dueDateId, (response) => {
      if (response.status) {
        setDueDates(dueDates.filter((dueDate) => dueDate.id != dueDateId));
      } else {
        alert(response.message);
      }
    });
  };

  useEffect(() => {
    getDueDates(props.course.id, (response) => {
      if (response.status) {
        setDueDates(response.data);
      } else {
        //Handle Error
      }
    });
  }, []);

  return (
    <div className="due-dates-container">
      <h1 className="detail-subtitle">Due dates</h1>
      <AddDueDateForm
        isAdding={isAdding}
        course={props.course}
        handleClose={() => setAddDueDateForm(false)}
        formStatus={addDueDateForm}
        addDueDate={(dueDate) => handleAddDueDate(dueDate)}
      />
      <IconButton
        onClick={() => setAddDueDateForm(true)}
        style={addDueDateIconStyle}
      >
        <AddIcon className="" />
      </IconButton>

      {dueDates.map((date, index) => (
        <DueDateItem
          isOwner={true}
          key={index}
          dueDate={date}
          deleteDueDate={(id) => handleDeleteDueDate(id)}
        />
      ))}
    </div>
  );
};

export default DueDates;
