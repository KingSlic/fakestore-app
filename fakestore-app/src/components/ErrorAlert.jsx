import { Alert } from 'react-bootstrap'


export default function ErrorAlert({ message = 'Something went wrong.' }) {
    return (
        <Alert variant="danger" className="my-3">
            {message}
        </Alert>
    )
}
