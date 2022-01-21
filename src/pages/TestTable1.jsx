import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead className="head">
              <TableRow>
                <TableCell>Номер модели</TableCell>
                <TableCell align="center">Фото</TableCell>
                <TableCell align="center">Цвет</TableCell>
                <TableCell align="center">Размер</TableCell>
                <TableCell align="center">Количество на складе</TableCell>
                <TableCell align="center">Количество на Вайлдбириз</TableCell>
                <TableCell align="center">Количество на Озон</TableCell>
              </TableRow>
            </TableHead>
            <TableBody id="bodyt">
              {products.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.artModel}
                  </TableCell>
                  <TableCell align="center">
                    <img width={100} src={item.image} alt="" />
                  </TableCell>
                  <TableCell align="center">{item.color}</TableCell>
                  <TableCell align="center">{item.size}</TableCell>
                  <TableCell align="center">{item.quantityOnStock}</TableCell>
                  <TableCell align="center">{item.quantityOnWb}</TableCell>
                  <TableCell align="center">{item.quantityOnOzon}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default TestTable;
