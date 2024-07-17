import { Row, Col } from "react-bootstrap";
import products from "../../Product";
import Product from "../components/Product";
function HomePage() {
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
