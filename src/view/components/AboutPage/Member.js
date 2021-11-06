import React from "react";
import { CardDeck } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const Member = ({ member }) => {
  return (
    <Card className="card-item-container">
      <div className="card-item-image-container">
        <Card.Img
          variant="top"
          src={member.coverImg}
          className="card-item-image"
        />
      </div>

      <Card.Body>
        <Card.Title className="card-title">{member.name}</Card.Title>
        <Card.Subtitle className="card-subtitle">{member.role}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default Member;
