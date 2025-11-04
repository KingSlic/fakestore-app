import axios from 'axios'
import { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'


export default function AddProduct() {
    const [form, setForm] = useState({
        title: '',
        price: '',
        description: '',
        category: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }


    const handleSubmit = async (error) => {
        error.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            const payload = {
                title: form.title,
                price: Number(form.price),
                description: form.description,
                image: 'https://i.pravatar.cc',
                category: form.category
            }
            await axios.post('https://fakestoreapi.com/products', payload)
            setSuccess('Product created successfully!')
            setForm({ title: '', price: '', description: '', category: '' })
        } catch (err) {
            setError('Failed to create product. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title className="mb-3">Add Product</Card.Title>


                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}


                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="e.g., electronics"
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


                    <div className="d-grid">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Create Product'}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}