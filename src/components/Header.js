import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from "reactstrap";

const Header = () => {
  return (
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
  );
};

export default Header;
