import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "../components/Rating";
function ProductPage() {
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get("/api/v1/products/6699c8d0959206a49b498ba8")
      .then((resp) => setProduct(resp.data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <>
      <Row>
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
              <Row>
                <Col>
                  <Button
                    variant="secondary"
                    disabled={product.countInStock <= 0}
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
