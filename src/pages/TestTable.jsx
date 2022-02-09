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

  let arrPhoto = [];
  products.map((i) => arrPhoto.push(i.image));

  let arrNameArrTotal = [];
  products.map((i) =>
    arrNameArrTotal.push({
      artModel: i.artModel,
      firstCost: i.firstCost,
      erp: i.erp,
      brand: i.brand,
    })
  );

  // console.log(arrNameArrTotal);
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

  //getting unique array for model data
  let uniqueArrNameArrTotal = uniqueNameArr.map((elem) => {
    return arrNameArrTotal.find((i) => elem === i.artModel);
  });

  // console.log(uniqueArrNameArrTotal);

  //getting unique Photo

  let uniquePhotoArr = unique(arrPhoto);
  let uniquePhotoArr1 = uniqueNameArr.map((elem) => {
    return uniquePhotoArr.find((i) => {
      if (i.includes(elem)) {
        let res = [];
        for (let str of uniquePhotoArr) {
          res.push(str);
        }

        return res;
      }
    });
  });

  // console.log(result);
  //get unique arr
  // let templateArr = ["color", "size"];
  // const res = art.map((u) =>
  //   templateArr.reduce((a, e) => {
  //     a[e] = u[e];
  //     return a;
  //   }, {})
  // );

  // console.log(res);

  let res = uniqueNameArr.map((elem) => {
    let art = filterByArt(myArray, elem);

    let arr = [];
    art.map((item) => {
      arr.push(item.quantityOnStockMain);
    });
    // console.log(arr);
    let result = arr.reduce(function (sum, el) {
      return sum + el;
    });

    console.log(result);
    return result;
  });

  //create elements

  return (
    <>
      <Link to="/">
        <Button>To Main</Button>
      </Link>
      <h1>Table</h1>
      <div className="table-test">
        {uniqueNameArr.map((elem) => {
          let art = filterByArt(myArray, elem);
          let stockMain = [];
          let stockOnWay = [];
          let stockSklad1 = [];

          return (
            <div className="one-art stroka" key={elem}>
              <div className="art-data stroka">
                <div className="art-number">{elem}</div>
                <div>
                  {uniqueArrNameArrTotal.map((i) => {
                    if (i.artModel === elem)
                      return (
                        <div className="" key={i}>
                          Брэнд {i.brand}
                        </div>
                      );
                  })}
                </div>
                <div>
                  {uniqueArrNameArrTotal.map((i) => {
                    if (i.artModel === elem)
                      return (
                        <div className="" key={i}>
                          Cебес {i.firstCost}
                        </div>
                      );
                  })}
                </div>
                <div>
                  {uniqueArrNameArrTotal.map((i) => {
                    if (i.artModel === elem)
                      return (
                        <div className="" key={i}>
                          РРЦ {i.erp}
                        </div>
                      );
                  })}
                </div>
                <div className="photo">
                  {uniquePhotoArr1.map((i) => {
                    if (i.includes(elem)) {
                      return (
                        <div className="stroka" key={i}>
                          <img width={100} src={i} alt="photo" />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="  nomenclature">
                <div className=" stroka groupnom">
                  <div className="block-1 stroka">Номенклатура</div>
                  <div className="block-in">
                    <div className=" stroka">
                      Цвет
                      {art.map((item) => {
                        return (
                          <div className="col-sizes" key={item.id}>
                            <div className="">
                              <div className="stroka"> {item.color}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className=" stroka">
                      Размер
                      {art.map((item) => {
                        return (
                          <div className="col-sizes" key={item.id}>
                            <div className="">
                              <div className="stroka"> {item.size}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="quantity-stock groupnom stroka">
                  <div className="block-2 stroka">Склад</div>
                  <div className="block-in">
                    <div className="quantity-stock  stroka">
                      Бишкек
                      {art.map((item) => {
                        stockMain.push(item.quantityOnStockMain);

                        return (
                          <div className="col-sizes" key={item.id}>
                            <div className="stroka">
                              {item.quantityOnStockMain}
                            </div>
                          </div>
                        );
                      })}
                      <div className="stroka">
                        итого{": "}
                        {stockMain.reduce(function (sum, el) {
                          return sum + el;
                        })}
                      </div>
                    </div>
                    <div className="quantity-stock stroka">
                      В пути
                      {art.map((item) => {
                        stockOnWay.push(item.quantityOnStockOnWay);

                        return (
                          <div className="col-sizes" key={item.id}>
                            <div className="stroka">
                              {item.quantityOnStockOnWay}
                            </div>
                          </div>
                        );
                      })}
                      <div className="stroka">
                        итого{": "}
                        {stockOnWay.reduce(function (sum, el) {
                          return sum + el;
                        })}
                      </div>
                    </div>
                    <div className="quantity-stock stroka">
                      Новосибирск
                      {art.map((item) => {
                        stockSklad1.push(item.quantityOnStockSklad1);

                        return (
                          <div className="col-sizes" key={item.id}>
                            <div className="stroka">
                              {item.quantityOnStockSklad1}
                            </div>
                          </div>
                        );
                      })}
                      <div className="stroka">
                        итого{": "}
                        {stockSklad1.reduce(function (sum, el) {
                          return sum + el;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="production groupnom stroka">
                  <div className="block-3 stroka">Производство</div>
                  <div className="block-in">
                    <div className="stroka">
                      В плане
                      {art.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="stroka">
                              {item.quantityOnProductionPlan}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="stroka">
                      В крое
                      {art.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="stroka">
                              {item.quantityOnProductionFit}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="stroka">
                      В пошиве
                      {art.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="stroka">
                              {item.quantityOnProductionSew}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="retail groupnom stroka">
                  <div className="block-4 stroka">Розница</div>
                  <div className="block-in">
                    <div className="stroka">
                      Продажи
                      {art.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="stroka">
                              {item.quantityRetailing}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="stroka">
                      Результат
                      {art.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="stroka">{item.profitRetailing}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="retail groupnom stroka">
                  <div className="block-5 stroka">Wildberries</div>
                  <div className="block-in">
                    <div className="stroka">
                      Резерв
                      {art.map((item) => {
                        return (
                          <div className="rez" key={item.id}>
                            <div className="stroka">
                              <input type="number" />
                            </div>
                            <div className="stroka">
                              {item.quantityOnWbReserve}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="stroka">
                      В пути на
                      {art.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="stroka">
                              {item.quantityOnWbOnWay}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="stroka">
                      Склад
                      {art.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="stroka">
                              {item.quantityOnWbStock}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="stroka">
                      У клиентов
                      {art.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="stroka">
                              {item.quantityOnWbClientReserve}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="stroka">
                      Продажи
                      {art.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="stroka">
                              {item.quantityOnWbSales}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="stroka">
                      Результат
                      {art.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="stroka">
                              {item.quantityOnWbSalesProfit}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TestTable;
