import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { userContext } from "../context/UserContext";

const BrandsDisplay = observer(() => {
  const { nomenclature } = useContext(userContext);

  return nomenclature._brands.map((i) => {
    return <div key={i.id}>{i.name}</div>;
  });
});

export default BrandsDisplay;
