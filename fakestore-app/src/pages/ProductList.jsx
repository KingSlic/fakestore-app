// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { Row, Col, Card, Button, Form } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import SpinningLoader from '../components/SpinningLoader'
// import ErrorAlert from '../components/ErrorAlert'

// export default function ProductsList() {
//     const [products, setProducts] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState('')
//     const [query, setQuery] = useState('')

//     useEffect(() => {
//         let cancelled = false
//         const fetchProduct = async () => {
//             setLoading(true)
//             try {
//                 const { data } = await axios.get('https://fakestoreapi.com/products')
//                 if (!cancelled) setProducts(data)
//             } catch (error) {
//                 if (!cancelled) setError('Failed to load products')
//             } finally {
//                 if (!cancelled) setLoading(false)
//             }
//         }
//         fetchProduct()
//         return () => { cancelled = true }
//     }, [])

//     const filtered = products.filter(p =>
//         p.title.toLowerCase().includes(query.toLowerCase())
//     )


//     if (loading) return <SpinningLoader label="Loading products..." />
//     if (error) return <ErrorAlert message={error} />

//     return (
//         <>
//             <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
//                 <h2 className="m-0">Products</h2>
//                 <Form className="d-flex" role="search">
//                     <Form.Control
//                         type="search"
//                         placeholder="Search products..."
//                         value={query}
//                         onChange={e => setQuery(e.target.value)}
//                     />
//                 </Form>
//             </div>


//             <Row xs={1} sm={2} md={3} lg={4} className="g-4">
//                 {filtered.map(p => (
//                     <Col key={p.id}>
//                         <Card className="h-100">
//                             <div className="text-center" style={{ height: 220, padding: 12 }}>
//                                 <Card.Img
//                                     variant="top"
//                                     src={p.image}
//                                     alt={p.title}
//                                     style={{ objectFit: 'contain', height: '100%' }}
//                                 />
//                             </div>
//                             <Card.Body className="d-flex flex-column">
//                                 <Card.Title className="fs-6">{p.title}</Card.Title>
//                                 <Card.Text className="fw-semibold mb-2">${p.price}</Card.Text>
//                                 <Button as={Link} to={`/products/${p.id}`} variant="primary" className="mt-auto">
//                                     View Details
//                                 </Button>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </>
//     )
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Badge,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadProduct = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(data);
    } catch {
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      navigate("/products", { replace: true });
    } catch {
      setError("Delete failed. Please try again.");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5">
        <Spinner className="me-2" /> <span>Loading product…</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-3">
        {error}{" "}
        <Button size="sm" variant="outline-light" onClick={loadProduct} className="ms-2">
          Retry
        </Button>
      </Alert>
    );
  }

  if (!product) return null;

  return (
    <>
      <Row className="gy-4">
        <Col md={5} className="text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded"
            style={{ maxHeight: 420, objectFit: "contain" }}
          />
        </Col>

        <Col md={7}>
          <h2 className="mb-2">{product.title}</h2>
          <div className="mb-2">
            <Badge bg="secondary" className="text-capitalize">
              {product.category}
            </Badge>
          </div>
          <h4 className="text-success mb-3">${product.price}</h4>
          <p className="mb-4">{product.description}</p>

          <div className="d-flex flex-wrap gap-2">
            <Button as={Link} to={`/products/${id}/edit`} variant="warning">
              Edit
            </Button>
            <Button variant="danger" onClick={() => setShowConfirm(true)} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete"}
            </Button>
            <Button as={Link} to="/products" variant="outline-secondary">
              Back to Products
            </Button>
          </div>
        </Col>
      </Row>

      {/* Delete confirmation modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will delete <strong>{product.title}</strong> (mock). FakeStoreAPI will respond as
          successful, but the change won’t persist. Continue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting…" : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}