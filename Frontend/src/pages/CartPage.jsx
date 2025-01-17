import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { addItem, removeItem } from "../slices/Carts";
const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const changeCartQty = (item, qty) => {
    dispatch(addItem({ ...item, qty }));
  };
  const removeCartItem = (id) => {
    dispatch(removeItem(id));
  };
  return (
    <>
      {cartItems.length == 0 ? (
        <Message>
          Your cart is currently empty <Link to="/">Go to Products</Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            {" "}
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} fluid rounded alt="item image" />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>
                        <strong>{item.name}</strong>
                      </Link>
                    </Col>
                    <Col md={2}>
                      <span>${(item.qty * item.price).toFixed(2)}</span>
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          changeCartQty(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col>
                      <Button
                        variant="light"
                        onClick={() => removeCartItem(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h4>
                  Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  Products{" "}
                </h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Net Total</Col>
                  <Col>
                    $
                    {cartItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Delivery Charge</Col>
                  <Col>$5</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Net Total</Col>
                  <Col>
                    <strong>
                      $
                      {cartItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        5
                      )}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartPage;
