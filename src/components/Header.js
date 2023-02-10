import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Container,
  NavbarText,
} from "reactstrap";

const Header = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
        integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
        crossorigin="anonymous"
      />
      <Navbar style={{ backgroundColor: "rgb(157 236 190)" }} light expand="md">
        <Container className="d-flex justify-content-between">
          <img
            src={require("../assets/img/logo.png")}
            alt="Logo"
            className="logo" height={100}
          />
          <Nav className="d-flex align-items-center">
            <NavItem>
              <NavLink href="#">Accueil</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Vos Plantes</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <i className="fas fa-user"></i>
          </NavbarText>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
