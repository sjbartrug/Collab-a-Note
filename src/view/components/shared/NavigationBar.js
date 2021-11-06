import React, { useState } from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { signout } from "../../../controller/auth";
import { useAuth } from "../../context/AuthContext";

const NavigationBar = () => {
  const [error, setError] = useState("");
  const history = useHistory();

  const { currentUser } = useAuth();

  async function handleSignout() {
    setError("");
    // try {
    //   await signout();
    //   history.push("/signin");
    //   console.log("Successfully Logged");
    // } catch {
    //   setError("Failed to log out");
    // }

    signout().then((response) => {
      if (response.status) {
        history.push("/signin");
      } else {
        setError(response.message);
      }
    });
  }

  return (
    <Navbar
      className="navbar"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand href="/">Collab-a-Note</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/dashboard">DashBoard</Nav.Link>
        </Nav>
        <Nav>
          {currentUser ? (
            <Nav.Link onClick={() => handleSignout()}>Logout</Nav.Link>
          ) : (
            <Nav.Link onClick={() => handleSignout()}>Sign in</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
