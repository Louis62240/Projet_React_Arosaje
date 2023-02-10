import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from "reactstrap";

const Header = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
        crossorigin="anonymous"
      />
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">Nom de votre entreprise</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#">Lien 1</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Lien 2</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Lien 3</NavLink>
            </NavItem>
          </Nav>
          <img src="path/to/your/logo.png" alt="Logo" style={{ height: "50px", marginLeft: "10px" }} />
        </Container>
      </Navbar>
    </>
  );
};

export default Header;