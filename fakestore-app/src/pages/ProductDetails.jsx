import { Row, Col, Button, Badge } from 'react-bootstrap'
import SpinningLoader from '../components/SpinningLoader'
import ErrorAlert from '../components/ErrorAlert'
import DeleteModal from '../components/DeleteModal'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'


export default function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showDelete, setShowDelete] = useState(false)
    const [deleting, setDeleting] = useState(false)


    useEffect(() => {
        let cancelled = false
        const run = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`)
                if (!cancelled) setProduct(data)
            } catch (e) {
                if (!cancelled) setError('Failed to load product.')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        run()
        return () => { cancelled = true }
    }, [id])


    const handleDelete = async () => {
        try {
            setDeleting(true)
            await axios.delete(`https://fakestoreapi.com/products/${id}`)
            navigate('/products', { replace: true })
        } catch (err) {
            setError('Delete failed. Please try again.')
        } finally {
            setDeleting(false)
            setShowDelete(false)
        }
    }


    if (loading) return <SpinningLoader label="Loading product..." />
    if (error) return <ErrorAlert message={error} />
    if (!product) return null

    return (
        <>
            <Row className="gy-4">
                <Col md={5} className="text-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid rounded"
                        style={{ maxHeight: 420, objectFit: 'contain' }}
                    />
                </Col>
                <Col md={7}>
                    <h2 className="mb-3 text-light">{product.title}</h2>
                    <div className="mb-2">
                        <Badge bg="secondary" className="text-capitalize">{product.category}</Badge>
                    </div>
                    <h4 className="text-success mb-3">${product.price}</h4>
                    <p className="mb-4 text-white-50">{product.description}</p>
                    <div className="d-flex gap-2 flex-wrap">
                        <Button as={Link} to={`/products/${id}/edit`} variant="warning">Edit</Button>
                        <Button variant="danger" onClick={() => setShowDelete(true)} disabled={deleting}>
                            {deleting ? 'Deleting...' : 'Delete'}
                        </Button>
                        <Button as={Link} to="/products" variant="outline-secondary">Back to Products</Button>
                    </div>
                </Col>
            </Row>

            <DeleteModal
                show={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={handleDelete}
                itemLabel={product.title}
            />
        </>
    )
}