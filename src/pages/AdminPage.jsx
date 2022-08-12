import { Button, FormControl } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BrandsDisplay from "../components/BrandsDisplay";
import ColorsDisplay from "../components/ColorsDisplay";
import BrandModal from "../components/modals/BrandModal ";
import ColorModal from "../components/modals/ColorModal ";
import SizeModal from "../components/modals/SizeModal";
import VendorCodeModal from "../components/modals/VendorCodeModal";
import NomenclatureModal from "../components/modals/NomenclatureModal";
import SizeDisplay from "../components/SizeDisplay";
import VendorCodeDisplay from "../components/VendorCodeDisplay";
import NomenclatureDisplay from "../components/NomenclatureDisplay";
import { userContext } from "../context/UserContext";
import { fetchBrands } from "../http/brandApi";
import { fetchColors } from "../http/colorApi";
import { fetchSizes } from "../http/sizeApi";
import { fetchVendorCodes } from "../http/vendorCodeApi";

const AdminPage = observer(() => {
  const [sizeVisible, setSizeVisible] = useState(false);
  const [colorVisible, setColorVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [vendorCodeVisible, setVendorCodeVisible] = useState(false);
  const [nomenclatureVisible, setNomenclatureVisible] = useState(false);
  // const [modalActive, setModalActive] = useState(false);
  const { nomenclature } = useContext(userContext);

  fetchSizes().then((data) => {
    nomenclature.setSizes(data);
  });
  fetchColors().then((data) => {
    nomenclature.setColors(data);
  });
  fetchBrands().then((data) => {
    nomenclature.setBrands(data);
  });
  fetchVendorCodes().then((data) => {
    nomenclature.setVendorCodes(data);
  });

  return (
    <div className="admin_button">
      <Link to="/">
        <Button>To Main</Button>
      </Link>

      <div>
        <SizeDisplay />
        <SizeModal show={sizeVisible} onHide={() => setSizeVisible(false)} />
        <button onClick={() => setSizeVisible(true)}>Добавить размер</button>
      </div>
      <div>
        <ColorsDisplay />
        <ColorModal show={colorVisible} onHide={() => setColorVisible(false)} />
        <button onClick={() => setColorVisible(true)}>Добавить цвет</button>
      </div>
      <div>
        <BrandsDisplay />
        <BrandModal show={brandVisible} onHide={() => setBrandVisible(false)} />
        <button onClick={() => setBrandVisible(true)}>Добавить брэнд</button>
      </div>
      <div>
        <button onClick={() => setVendorCodeVisible(true)}>
          Добавить Артикул
        </button>
        <VendorCodeDisplay />
        <VendorCodeModal
          show={vendorCodeVisible}
          onHide={() => setVendorCodeVisible(false)}
        />
      </div>
      <div>
        <button onClick={() => setNomenclatureVisible(true)}>
          Добавить номенклатуру
        </button>
        <NomenclatureDisplay />
        <NomenclatureModal
          show={nomenclatureVisible}
          onHide={() => setNomenclatureVisible(false)}
        />
      </div>
    </div>
  );
});

export default AdminPage;
