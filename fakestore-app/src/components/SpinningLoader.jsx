import { Spinner } from 'react-bootstrap'


export default function SpinningLoader({ label = 'Loading...' }) {
    return (
        <div className="d-flex align-items-center justify-content-center py-5">
            <Spinner animation="border" role="status" className="me-2" />
            <span>{label}</span>
        </div>
    )
}