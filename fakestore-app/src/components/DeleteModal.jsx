import { Modal, Button } from 'react-bootstrap'

export default function DeleteModal({ show, onClose, onConfirm,
    itemLabel = 'this item' }) {
        return (
            <Modal show={show} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {itemLabel}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="danger" onClick={onConfirm}>Delete</Button>
                </Modal.Footer>
            </Modal>
        )
    }