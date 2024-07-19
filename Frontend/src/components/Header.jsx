import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/react.svg";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
function Header() {
  return (
    <header>
      <Navbar variant="dark" bg="dark" expand="md">
        <Container>
          <NavLink to="/" className="navbar-brand">
            <img src={logo} alt="Logo" />
            <span className="ms-1 fs-3">Broadway</span>
          </NavLink>

          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto">
              <NavLink to="/cart" className="nav-link">
                <FaShoppingCart />
                Cart
              </NavLink>
              <NavLink to="/product" className="nav-link">
                <FaUser />
                Signin
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
export default Header;