import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../assets/react.svg";
function Header() {
  const { cartItems } = useSelector((state) => state.cart);

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
                {cartItems.length > 0 && (
                  <Badge bg="success" pill>
                    {/* {cartItems.length} */}
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
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
