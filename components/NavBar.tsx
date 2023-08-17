import Link from "next/link";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
      <Container>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" >
          <Nav>
            <Nav.Link as={Link} href="/"> Breaking</Nav.Link>
            <Nav.Link as={Link} href="/search"> Breaking</Nav.Link>
            <NavDropdown title="categories" id="/categories-dropdown">
              <NavDropdown.Item as={Link} href="categories/business">Businees</NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
 
export default NavBar;