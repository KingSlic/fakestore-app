import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import mango from "../assets/mango-1.png"

export default function StoreNavbar() {
    return (
        <Navbar bg="light" variant="light" expand="lg" sticky="top" className="shadow-sm p-3 mb-4">
            
            <Navbar.Brand as={NavLink} to="/">
                <img src={mango} 
                 alt="mango"
                 width="120"
                 height="20"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-nav" />
            <Navbar.Collapse id="main-nav">
                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                    <Nav.Link as={NavLink} to="/addproduct">Add Product</Nav.Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}
