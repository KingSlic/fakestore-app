import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";

export default function ProductList() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  const loadProduct = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`https://fakestoreapi.com/products`);
      setProduct(data);
    } catch (error) {
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5">
        <Spinner className="me-2" /> <span>Loading product…</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-3 d-flex justify-content-between align-items-center">
        <span>{error}</span>
        <Button size="sm" variant="outline-light" onClick={loadProduct} className="ms-2">
          Retry
        </Button>
      </Alert>
    );
  }


  return (
    <>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {product.map((p) => (
          <Col key={p.id}>
            <Card className="h-100 product-card">
              <div className="text-center"
               style={{ height: 220, padding: 12 }}>
                <Card.Img
                  variant="top"
                  src={p.image}
                  alt={p.title}
                  style={{ objectFit: "contain", height: "100%" }}
                />
              </div>
              <Card.Body className="d-flex flex-column ">
                <Card.Title className="fs-6">{p.title}</Card.Title>
                <Card.Text className="fw-semibold mb-2">${p.price}</Card.Text>
                <Button as={Link} to={`/products/${p.id}`} className="mt-auto product-btn">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </>
  );
}