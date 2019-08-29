import React from "react";
import { Modal,Button } from "react-bootstrap";

export default function({showModal,onCancel,onConfirm}) {
  return (
    <Modal show={showModal !== -1}>
      <Modal.Header closeButton>
        <Modal.Title>are u sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>confirm to delete post</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Close
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
