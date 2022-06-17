import React, { useState } from "react";
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
import { createBrand } from "../../http/brandApi";

const BrandModal = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const addBrand = () => {
    createBrand({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">
          Добавление Брэнда
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormControl
            className="placeholder"
            placeholder={"Enter brand"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addBrand}>
          Add brand
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BrandModal;
