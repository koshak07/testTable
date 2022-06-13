import React from "react";
import {
  Button,
  Form,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

const SizeModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">
          Добавление размера
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormControl placeholder={"Enter size"} />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={onHide}>
          Add size
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SizeModal;
