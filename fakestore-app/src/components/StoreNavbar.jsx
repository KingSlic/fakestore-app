import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import mango from "../assets/mango-1.png"


export default function StoreNavbar() {
    
  //A lil magic to 
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#d4a017" : "#000000",   // gold active, black default
    fontWeight: isActive ? "600" : "400",
    textDecoration: "none"
  });

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      sticky="top"
      className="shadow-sm p-3 mb-4"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src={mango}
            alt="Mango"
            width="120"
            height="20"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end style={linkStyle}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" style={linkStyle}>
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/addproduct" style={linkStyle}>
              Add Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}