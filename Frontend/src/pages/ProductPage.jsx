import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { addItem } from "../slices/Carts";
function ProductPage() {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/products/" + id)
      .then((resp) => setProduct(resp.data))
      .catch((err) => console.log(err.message));
  }, []);

  const addToCartHandler = (item) => {
    dispatch(addItem(item));
    navigate("/cart");
  };
  return (
    <>
      <Link to="/" className="btn btn-success">
        Go Back
      </Link>
      <Row className="my-3">
        <Col md={5}>
          <Image src={product.image} fluid></Image>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>{product.price}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
              <span>{product.description}</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>
                  <p>Price</p>
                </Col>
                <Col>
                  <p>{product.price}</p>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <p>Status</p>
                </Col>
                <Col>
                  <strong>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Control
                as="select"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1}>{x + 1}</option>
                ))}
              </Form.Control>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  <Button
                    variant="secondary"
                    disabled={product.countInStock <= 0}
                    onClick={() =>
                      addToCartHandler({ ...product, qty: Number(qty) })
                    }
                  >
                    Add to Cart
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default ProductPage;
