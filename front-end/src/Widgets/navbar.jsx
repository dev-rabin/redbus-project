import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/store";
import "../App.css";
function NavbarWidget() {
  const { isLoggedIn, user } = useAuth();

  return (
    <Navbar className="bg-secondry navbar-light myNavbar border-bottom-danger" expand="md" collapseOnSelect={false}>
      <Container>
        <Navbar.Brand className="text-dark fs-4" href="/">
          <strong>Redbus</strong>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end text-dark fw-bold">
            <NavLink to="/" className="nav-link text-dark text-decoration-none mx-3">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link text-dark text-decoration-none mx-3">
              About
            </NavLink>
            <NavLink to="/bookings" className="nav-link text-dark text-decoration-none mx-3">
              Bookings
            </NavLink>
            <Navbar.Text>
              {isLoggedIn ? <NavLink to="/logout" className="text-decoration-none mx-3">Log Out</NavLink> : <>
              <NavLink to="/login" className="text-decoration-none mx-3">Log In</NavLink>
              <NavLink to="/register" className="text-decoration-none mx-3">Register</NavLink>
              </>}
            </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarWidget;
