import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {
  Button,
  Dropdown,
  Form,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { userContext } from "../../context/UserContext";
import { fetchBrands } from "../../http/brandApi";
import { createVendorCode } from "../../http/vendorCodeApi";

const VendorCodeModal = observer(({ show, onHide }) => {
  const { nomenclature } = useContext(userContext);

  const [name, setName] = useState("");
  const [erp, setErp] = useState(0);
  const [firstCoast, setFirstCoast] = useState(0);
  const [file, setFile] = useState();
  const addVendorCode = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brandId", nomenclature.selectedBrand.id);
    formData.append("firstCoast", `${firstCoast}`);
    formData.append("erp", `${erp}`);
    formData.append("mainImage", file);
    console.log(formData);
    createVendorCode(formData).then((data) => onHide());
  };
  useEffect(() => {
    fetchBrands().then((data) => {
      nomenclature.setBrands(data);
    });
  }, []);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
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
          <Dropdown>
            <DropdownToggle>
              {nomenclature.selectedBrand.name || "Выберите Брэнд"}
            </DropdownToggle>
            <DropdownMenu>
              {nomenclature._brands.map((i) => (
                <DropdownItem
                  onClick={() => nomenclature.setSelectedBrand(i)}
                  key={i.id}
                >
                  {i.name}
                  {console.log("here")}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <FormControl
            className="placeholder"
            placeholder={"Enter name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <p>Себестоимость</p>
          <FormControl
            className="placeholder"
            placeholder={"Enter firstCoast"}
            type="number"
            value={firstCoast}
            onChange={(e) => setFirstCoast(Number(e.target.value))}
          />
          <br />
          <p>РРЦ</p>
          <FormControl
            className="placeholder"
            placeholder={"Enter erp"}
            type="number"
            value={erp}
            onChange={(e) => setErp(Number(e.target.value))}
          />
          <FormControl type="file" onChange={selectFile} />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addVendorCode}>
          Add brand
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default VendorCodeModal;
