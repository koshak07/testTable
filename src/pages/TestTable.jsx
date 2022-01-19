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
    <div>
      <Link to="/">
        <Button>To Main</Button>
      </Link>
      <h1>Table</h1>
      <div className="table-test">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Номер модели</TableCell>
                <TableCell align="right">Фото</TableCell>
                <TableCell align="right">Цвет</TableCell>
                <TableCell align="right">Размер</TableCell>
                <TableCell align="right">Количество на складе</TableCell>
                <TableCell align="right">Количество на Вайлдбириз</TableCell>
                <TableCell align="right">Количество на Озон</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.artModel}
                  </TableCell>
                  <TableCell align="right">
                    <img width={100} src={item.image} alt="" />
                  </TableCell>
                  <TableCell align="right">{item.color}</TableCell>
                  <TableCell align="right">{item.size}</TableCell>
                  <TableCell align="right">{item.quantityOnStock}</TableCell>
                  <TableCell align="right">{item.quantityOnWb}</TableCell>
                  <TableCell align="right">{item.quantityOnOzon}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TestTable;
