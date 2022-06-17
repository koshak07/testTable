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
import { createColor } from "../../http/colorApi";

const ColorModal = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const addColor = () => {
    createColor({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">
          Добавление Цвета
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormControl
            className="placeholder"
            placeholder={"Enter color"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addColor}>
          Add color
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ColorModal;
