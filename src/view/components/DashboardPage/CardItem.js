import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import "../../styles/DashBoard.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CircularProgress } from "@material-ui/core";

const options = ["Edit", "Change cover image", "Delete"];

const ITEM_HEIGHT = 48;

const CardItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!props.course) return null;

  return (
    <Card className="card-item-container">
      <div onClick={props.onClick}>
        <div className="card-item-image-container">
          <Card.Img
            variant="top"
            src={props.course.coverImg}
            className="card-item-image"
          />
          {isLoading ? (
            <div className="card-item-image-container-shadow" />
          ) : null}

          <div className="loading-icon">
            {isLoading ? <CircularProgress /> : null}
          </div>
        </div>
        <Card.Body>
          <Card.Title className="card-item-title">
            {props.course.name}
          </Card.Title>
          <Card.Subtitle className="card-subtitle">
            {props.course.teacher}
          </Card.Subtitle>
        </Card.Body>
      </div>
      {props.isOwner ? (
        <div className="card-item-menu">
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                props.openEditForm();
                handleClose();
              }}
            >
              Edit
            </MenuItem>

            <MenuItem
              onClick={() => {
                //props.setFocusCourse(props.course);
                document.getElementById(props.course.id).click();
                handleClose();
              }}
            >
              Change cover image
            </MenuItem>
            <input
              type="file"
              accept="image/*"
              hidden
              id={props.course.id}
              onChange={(event) => {
                setIsLoading(true);
                props.uploadImage(event, props.course, () => {
                  setIsLoading(false);
                });
              }}
            />
            <MenuItem onClick={() => props.deleteCourse(props.course.id)}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      ) : null}
    </Card>
  );
};

export default CardItem;
