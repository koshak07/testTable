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
import { createSize } from "../../http/sizeApi";

const SizeModal = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const addSize = () => {
    try {
      createSize({ name: value }).then((data) => {
        setValue("");
        onHide();
      });
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">
          Добавление размера
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormControl
            className="placeholder"
            placeholder={"Enter size"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addSize}>
          Add size
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SizeModal;
