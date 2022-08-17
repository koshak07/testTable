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
import {
  fetchOneVendorCodes,
  fetchVendorCodes,
} from "../../http/vendorCodeApi";
import { fetchColors } from "../../http/colorApi";
import { fetchSizes } from "../../http/sizeApi";
import { createNomenclature } from "../../http/nomenclatureApi ";
import { ControllableStates } from "./Autoinput.js";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";

const NomenclatureModal = observer(({ show, onHide }) => {
  const { nomenclature } = useContext(userContext);

  const [barcode, setBarcode] = useState("");
  const [vendorCode, setVendorCode] = useState("");
  const [erp, setErp] = useState("");
  const [firstCoast, setFirstCoast] = useState("");
  const [file, setFile] = useState();
  const addNomenclature = () => {
    const formData = new FormData();
    formData.append("barcode", barcode);
    formData.append("vendorCodeId", currentBrand.id);

    formData.append("brandId", nomenclature.selectedBrand.id);
    formData.append("sizeId", nomenclature.selectedSize.id);
    formData.append("colorId", nomenclature.selectedColor.id);
    formData.append("firstCoast", `${firstCoast}`);
    formData.append("erp", `${erp}`);
    formData.append("mainImage", file);
    createNomenclature(formData).then((data) => onHide());
    console.log(formData);
  };
  useEffect(() => {
    fetchBrands().then((data) => {
      nomenclature.setBrands(data);
    });
  }, []);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  let vendName = nomenclature.selectedVendorCode;

  let arrForFill = [];
  nomenclature._vendorCodes.map((i) =>
    arrForFill.push({
      id: i.id,
      name: i.name,
      mainImage: i.mainImage,
      brandId: i.brandId,
    })
  );
  let currentBrand = arrForFill.find((i) => i.name === vendName);
  useEffect(() => {
    if (currentBrand && show) {
      setVendorCode(currentBrand.id);
    }
  }, [vendName]);
  useEffect(() => {
    if (!show) {
      nomenclature.setSelectedVendorCode(0);
      nomenclature.setSelectedBrand(0);
      nomenclature.setSelectedSize(0);
      nomenclature.setSelectedColor(0);
      setVendorCode("");
      setBarcode("");
      setErp(0);
      setFirstCoast(0);
    }
  }, [show]);
  console.log(vendName);
  console.log(show);
  console.log(currentBrand);
  console.log(vendorCode);
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">
          Добавление Номенклатуры
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <br />
          <div>
            {currentBrand != undefined && show ? (
              <div>{currentBrand.name}</div>
            ) : null}
            {}
          </div>
          {/* <div>Брэнд {currentBrand.brandId}</div> */}
          <br />
          <div>{<ControllableStates />}</div>
          <Dropdown>
            <DropdownToggle>
              {nomenclature.selectedSize.name || "Выберите размер"}
            </DropdownToggle>
            <DropdownMenu>
              {nomenclature._sizes.map((i) => (
                <DropdownItem
                  onClick={() => nomenclature.setSelectedSize(i)}
                  key={i.id}
                >
                  {i.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <br />
          <Dropdown>
            <DropdownToggle>
              {nomenclature.selectedColor.name || "Выберите цвет"}
            </DropdownToggle>
            <DropdownMenu>
              {nomenclature._colors.map((i) => (
                <DropdownItem
                  onClick={() => nomenclature.setSelectedColor(i)}
                  key={i.id}
                >
                  {i.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <FormControl
            className="placeholder"
            placeholder={"Enter barcode"}
            required
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
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
        <Button variant="outline-success" onClick={addNomenclature}>
          Add nomenclature
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default NomenclatureModal;
