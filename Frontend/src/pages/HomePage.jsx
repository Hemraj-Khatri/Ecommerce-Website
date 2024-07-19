import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";
function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/v1/products")
      .then((resp) => resp.json())
      .then((data) => setProducts(data))
      .catch((err) =>
        console.log("Error Occur while fetching api", err.message)
      );
  }, []);
  return (
    <Row>
      {products.map((product) => (
        <Col sm={12} md={6} lg={4} xlg={2}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );
}
export default HomePage;
