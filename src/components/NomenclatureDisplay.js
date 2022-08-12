import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { userContext } from "../context/UserContext";
import { fetchOneVendorCodes } from "../http/vendorCodeApi";

const NomenclatureDisplay = observer(() => {
  const { nomenclature } = useContext(userContext);

  return nomenclature._vendorCodes.map((i) => {
    return (
      <div key={i.id}>
        {i.name}
        <img
          width={150}
          src={process.env.REACT_APP_API_URL + i.mainImage}
          alt=""
        />{" "}
      </div>
    );
  });
});

export default NomenclatureDisplay;
