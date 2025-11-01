import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setForm({
        title: data.title || "",
        price: data.price || "",
        description: data.description || "",
        category: data.category || "",
      });
    } catch {
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.title.trim()) return "Title is required.";
    if (form.price === "" || Number(form.price) <= 0) return "Price must be > 0.";
    if (!form.category.trim()) return "Category is required.";
    if (!form.description.trim()) return "Description is required.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const v = validate();
    if (v) return setError(v);

    setSaving(true);
    setError("");
    try {
      const payload = {
        title: form.title.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        category: form.category.trim(),
        image: "https://i.pravatar.cc/300", // placeholder image
      };
      await axios.put(`https://fakestoreapi.com/products/${id}`, payload);
      setSuccess("Product updated (mock). Changes won’t persist on refresh.");
      // If you prefer to go back after saving:
      // navigate(`/products/${id}`);
    } catch {
      setError("Failed to update product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5">
        <Spinner className="me-2" /> <span>Loading product…</span>
      </div>
    );
  }

  if (error && !success && !form.title) {
    return (
      <Alert variant="danger" className="my-3">
        {error}{" "}
        <Button size="sm" variant="outline-light" onClick={load} className="ms-2">
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Edit Product</Card.Title>

        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="category"
              type="text"
              value={form.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save Changes"}
            </Button>
            <Button as={Link} to={`/products/${id}`} variant="outline-secondary">
              Cancel
            </Button>
          </div>
        </Form>

        <p className="text-muted mt-3" style={{ fontSize: "0.9rem" }}>
          FakeStoreAPI note: POST/PUT/DELETE respond as successful but do not
          persist changes across refreshes.
        </p>
      </Card.Body>
    </Card>
  );
}