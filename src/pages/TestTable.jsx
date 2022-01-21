import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/UserContext";

const TestTable = () => {
  const { getProducts, products } = useContext(userContext);
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Link to="/">
        <Button>To Main</Button>
      </Link>
      <h1>Table</h1>
      <div className="table-test">
        <table>
          <tr className="thead">
            <th align="center">Номер модели</th>
            <th align="center">Фото</th>
            <th align="center">Цвет</th>
            <th align="center">Размер</th>
            <th align="center">Количество на складе</th>
            <th align="center">Количество на Вайлдбириз</th>
            <th align="center">Количество на Озон</th>
          </tr>

          <tbody className="tbody">
            {products.map((item) => (
              <trr className="stroka" key={item.id}>
                <trr>{item.artModel}</trr>
                <trr align="center">
                  <img width={100} src={item.image} alt="" />
                </trr>
                <tr align="center">{item.color}</tr>
                <tr align="center">{item.size}</tr>
                <tr align="center">{item.quantityOnStock}</tr>
                <tr align="center">{item.quantityOnWb}</tr>
                <tr align="center">{item.quantityOnOzon}</tr>
              </trr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TestTable;
