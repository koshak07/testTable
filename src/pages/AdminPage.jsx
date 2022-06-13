import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SizeModal from "../components/modals/SizeModal";
import { userContext } from "../context/UserContext";
import { fetchSizes } from "../http/sizeApi";

const AdminPage = observer(() => {
  const [modalVisible, setModalVisible] = useState(false);
  const { nomenclature } = useContext(userContext);

  useEffect(() => {
    // const nomFunc = fetchSizes(nomenclature.data);
    // console.log(
    //   nomFunc.map((size) => {
    //     return size;
    //   })
    // );
    fetchSizes().then((data) => {
      nomenclature.setSizes(data);
      let size = data.map((i) => console.log(i.name));
    });
  }, []);
  return (
    <div className="admin_button">
      <Link to="/">
        <Button>To Main</Button>
      </Link>

      <button>Добавить брэнд</button>
      <button onClick={() => setModalVisible(true)}>Добавить размер</button>
      <button>Добавить цвет</button>
      <SizeModal show={modalVisible} onHide={() => setModalVisible(false)} />
    </div>
  );
});

export default AdminPage;
