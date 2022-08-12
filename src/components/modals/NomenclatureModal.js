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
  const [erp, setErp] = useState(0);
  const [firstCoast, setFirstCoast] = useState(0);
  const [file, setFile] = useState();
  const addNomenclature = () => {
    const formData = new FormData();
    formData.append("barcode", barcode);
    formData.append("vendorCodeId", nomenclature.selectedVendorCode.id);

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

  const vendName = nomenclature.selectedVendorCode;

  const func = async () => {
    let arr = [];
    return await fetchVendorCodes().then((data) => {
      return (arr = arr.push(data));
    });
  };
  let arr = fetchVendorCodes().then(function (data) {
    return data.map((i) => i);
  });

  // array.push(func());
  // fetchVendorCodes().then(function (data) {
  //   arr = data.map((i) => arr.push({ name: i.name, id: i.id }));
  //   return arr;
  // });
  const copyArr = (array1, array2) => {
    let res = array2.map((i) => array1.push(i));

    return res;
  };
  // fetchVendorCodes().then(function (data) {

  //   return res;
  // });

  // array.push(nomenclature._vendorCodes);
  let arr1 = [
    { id: 1, mainImage: "53-16.jpg", name: "53-16" },
    { id: 2, mainImage: "46-20.jpg", name: "46-20" },
    { id: 3, mainImage: "49-97.jpg", name: "49-97" },
    { id: 4, mainImage: "4-97.jpg", name: "4-97" },
    { id: 5, mainImage: "5-33.jpg", name: "5-33" },
    { id: 6, mainImage: "45-40.jpg", name: "45-40" },
    { id: 7, mainImage: "120.jpg", name: "120" },
  ];
  let arr2 = [];
  // copyArr(arr2, arr);
  // for (var i = 0; i < arr.length; i++) {
  //   console.log(arr[i]);
  //   arr2[i] = arr[i];
  // }
  let idName = fetchOneVendorCodes(3).then();

  // let result = arr.find((item) => item.id === 1);
  // arr.map((i) => console.log(i.name));
  // arr2.map((i) => console.log(i.name));
  console.log(arr1);
  console.log(arr);
  console.log(arr2);

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
          {/* {vendName} */}
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
