import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/UserContext";
let _ = require("lodash");

const TestTable = () => {
  const { getProducts, products } = useContext(userContext);
  useEffect(() => {
    getProducts();
  }, []);

  //get array filtered on artModel
  let myArray = products;

  function filterByArt(arr, artModel) {
    return arr.filter(function (item, i, arr) {
      return item.artModel === artModel;
    });
  }

  let arrName = [];
  products.map((i) => arrName.push(i.artModel));

  //getting unique array artModel

  function unique(arr) {
    let result = [];

    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }

    return result;
  }
  let uniqueNameArr = unique(arrName);
  // let art = filterByArt(myArray, uniqueNameArr[0]);

  //get unique arr
  // let templateArr = ["color", "size"];
  // const res = art.map((u) =>
  //   templateArr.reduce((a, e) => {
  //     a[e] = u[e];
  //     return a;
  //   }, {})
  // );

  // console.log(res);

  // console.log(art);

  //create elements

  // art.find((i) => {
  //   if ((i.artModel = uniqueNameArr[0])) {
  //     console.log(i.image);
  //   }
  // });

  return (
    <>
      <Link to="/">
        <Button>To Main</Button>
      </Link>
      <h1>Table</h1>
      <div className="table-test">
        {uniqueNameArr.map((elem) => {
          let art = filterByArt(myArray, elem);
          console.log(art);
          return (
            <div className="one-art stroka">
              <div className="art-data stroka">
                <div className="art-number ">
                  <div className="thead-in">Номер модели</div>
                  <div className="" key={elem}>
                    {elem}
                  </div>
                  <div className="">
                    {art.map((i) => {
                      let check = art.find((el) => el.artModel == elem);

                      // console.log(check);

                      // return (
                      //   <div>
                      //     {<img width={100} src={check.image} alt="" />}
                      //   </div>
                      // );
                    })}
                  </div>
                </div>
              </div>
              <div className="nomenclature">
                {art.map((item) => {
                  let col = item.color;
                  let size = item.size;
                  return (
                    <div>
                      <div className="col-sizes" key={item.id}>
                        <div className="stroka"> Цвет {col}</div>
                        <div className="stroka"> Размер {size}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TestTable;
