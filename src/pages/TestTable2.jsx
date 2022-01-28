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

  let art = filterByArt(myArray, uniqueNameArr[0]);
  //get unique arr
  let templateArr = ["color", "size"];
  const res = art.map((u) =>
    templateArr.reduce((a, e) => {
      a[e] = u[e];
      return a;
    }, {})
  );

  // console.log(res);

  // console.log(art);

  //create elements

  let arrNum = art.map((i) => {
    if (i.artModel === uniqueNameArr[0]) {
      return (
        <div className="stroka" key={i.id}>
          {i.color}
        </div>
      );
    }
  });
  let arrNum1 = art.map((i) => {
    if (i.artModel === uniqueNameArr[0]) {
      return (
        <div className="stroka" key={i.id}>
          {i.size}
        </div>
      );
    }
  });

  return (
    <>
      <Link to="/">
        <Button>To Main</Button>
      </Link>
      <h1>Table</h1>
      <div className="table-test">
        <div>
          <div className="tbody">
            {art.map((item) => (
              <div className="" key={item.id}>
                <div className="art-data">
                  <div className="art-number">
                    <div className="thead-in">Номер модели</div>
                    <div className="">{item.artModel}</div>
                    <div className="">Себестоимость {item.firstCost}</div>
                  </div>
                </div>
                <div className="one-art">
                  <div className="art-foto">
                    <div className="thead-in">Фото</div>
                    <div className="stroka">
                      <img width={100} src={item.image} alt="" />
                    </div>
                  </div>
                  <div className="art-color">
                    <div className="thead-in">Цвет</div>
                    {/* <div className="stroka">{item.color}</div> */}
                    <div className="stroka">{arrNum}</div>
                  </div>
                  <div className="art-size">
                    <div className="thead-in">Размер</div>
                    {/* <div className="stroka">{item.size}</div> */}
                    <div className="stroka">{arrNum1}</div>
                  </div>
                  <div className="art-quantity-stock">
                    <div className="thead-in">Количество на складе</div>
                    <div className="stroka">{item.quantityOnStock}</div>
                  </div>
                  <div className="art-quantity-wb">
                    <div className="thead-in">Количество на Вайлдбириз</div>
                    <div className="stroka">{item.quantityOnWb}</div>
                  </div>
                  <div className="art-quantity-ozon">
                    <div className="thead-in">Количество на Озон</div>
                    <div className="stroka">{item.quantityOnOzon}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestTable;
