import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/UserContext";
let _ = require("lodash");

const TestTable = (props) => {
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

  //sort

  //////
  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items].sort(sortfunctionColor);

      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
    const requestSort = (key) => {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };
  /////
  let colorArr = uniqueNameArr.map((elem) => {
    let res = [];
    let art = filterByArt(myArray, elem);

    return art;
  });
  const { items, requestSort, sortConfig } = useSortableData(myArray);

  const getClassNamesFor = (color) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === color ? sortConfig.direction : undefined;
  };

  //////

  function sortfunctionColor(a, b) {
    if (a.color < b.color) return -1;

    if (a.color > b.color) return 1;
    if (a.size < b.size) return -1;

    if (a.size > b.size) return 1;

    return 0;
  }

  return (
    <>
      <Link to="/">
        <Button>To Main</Button>
      </Link>
      <h1>Table</h1>
      <div className="table-test">
        <div className="thead">
          <div className="tr">
            <div className="artNames">Название</div>
          </div>
          <div className="tr">
            <div className="nom">
              <button
                type="button"
                onClick={() => requestSort("color")}
                className={getClassNamesFor("color")}
              >
                Color
              </button>
            </div>
          </div>

          <div className="stock">Склад</div>
          <div className="production">Производство</div>
          <div className="retail">Розница</div>
          <div className="wb">Wildberries</div>
        </div>
        <div className="tbody">
          {uniqueNameArr.map((elem) => {
            let art = filterByArt(items, elem);
            let stockMain = [];
            let stockOnWay = [];
            let stockSklad1 = [];
            let productionPlan = [];
            let productionFit = [];
            let productionSew = [];
            let quantityRetailing = [];
            let profitRetailing = [];
            let onWbReserv = [];
            let onWbOnWay = [];
            let onWbOnStock = [];
            let onWbOnСlientReserve = [];
            let onWbOnSales = [];
            let onWbOnSalesProfit = [];

            // let arrSumPerStock = [];
            // let st = ".sum";
            // console.log(typeof st);
            // arrSumPerStock.push({
            //   elem: st,
            // });
            // console.log(arrSumPerStock);

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
                            <img width={100} src={i} alt="" />
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
                      <div className="color stroka">
                        <button
                          type="button"
                          onClick={() => requestSort("color")}
                          className={getClassNamesFor("color")}
                        >
                          Цвет
                        </button>
                        {art.map((item) => {
                          return (
                            <div className="col-sizes" key={item.id}>
                              <div className="stroka"> {item.color}</div>
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
                        <button
                          type="button"
                          onClick={() => requestSort("quantityOnStockMain")}
                          className={getClassNamesFor("quantityOnStockMain")}
                        >
                          Бишкек
                        </button>
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
                        <div className="stroka sum">
                          итого{": "}
                          {stockMain.reduce(function (sum, el) {
                            return sum + el;
                          })}
                        </div>
                      </div>
                      <div className="quantity-stock stroka">
                        <button
                          type="button"
                          onClick={() => requestSort("quantityOnStockOnWay")}
                          className={getClassNamesFor("quantityOnStockOnWay")}
                        >
                          В пути
                        </button>
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
                        <button
                          type="button"
                          onClick={() => requestSort("quantityOnStockSklad1")}
                          className={getClassNamesFor("quantityOnStockSklad1")}
                        >
                          Новосибирск
                        </button>
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
                        <button
                          type="button"
                          onClick={() =>
                            requestSort("quantityOnProductionPlan")
                          }
                          className={getClassNamesFor(
                            "quantityOnProductionPlan"
                          )}
                        >
                          В плане
                        </button>
                        {art.map((item) => {
                          productionPlan.push(item.quantityOnProductionPlan);

                          return (
                            <div key={item.id}>
                              <div className="stroka">
                                {item.quantityOnProductionPlan}
                              </div>
                            </div>
                          );
                        })}
                        <div className="stroka">
                          итого{": "}
                          {productionPlan.reduce(function (sum, el) {
                            return sum + el;
                          })}
                        </div>
                      </div>
                      <div className="stroka">
                        <button
                          type="button"
                          onClick={() => requestSort("quantityOnProductionFit")}
                          className={getClassNamesFor(
                            "quantityOnProductionFit"
                          )}
                        >
                          В крое
                        </button>
                        {art.map((item) => {
                          productionFit.push(item.quantityOnProductionFit);

                          return (
                            <div key={item.id}>
                              <div className="stroka">
                                {item.quantityOnProductionFit}
                              </div>
                            </div>
                          );
                        })}
                        <div className="stroka">
                          итого{": "}
                          {productionFit.reduce(function (sum, el) {
                            return sum + el;
                          })}
                        </div>
                      </div>
                      <div className="stroka">
                        <button
                          type="button"
                          onClick={() => requestSort("quantityOnProductionSew")}
                          className={getClassNamesFor(
                            "quantityOnProductionSew"
                          )}
                        >
                          В пошиве
                        </button>
                        {art.map((item) => {
                          productionSew.push(item.quantityOnProductionSew);

                          return (
                            <div key={item.id}>
                              <div className="stroka">
                                {item.quantityOnProductionSew}
                              </div>
                            </div>
                          );
                        })}
                        <div className="stroka">
                          итого{": "}
                          {productionSew.reduce(function (sum, el) {
                            return sum + el;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="retail groupnom stroka">
                    <div className="block-4 stroka">Розница</div>
                    <div className="block-in">
                      <div className="stroka">
                        <button
                          type="button"
                          onClick={() => requestSort("quantityRetailing")}
                          className={getClassNamesFor("quantityRetailing")}
                        >
                          Продажи
                        </button>
                        {art.map((item) => {
                          quantityRetailing.push(item.quantityRetailing);

                          return (
                            <div key={item.id}>
                              <div className="stroka">
                                {item.quantityRetailing}
                              </div>
                            </div>
                          );
                        })}
                        <div className="stroka">
                          итого{": "}
                          {quantityRetailing.reduce(function (sum, el) {
                            return sum + el;
                          })}
                        </div>
                      </div>
                      <div className="stroka">
                        <button
                          type="button"
                          onClick={() => requestSort("profitRetailing")}
                          className={getClassNamesFor("profitRetailing")}
                        >
                          Результат
                        </button>
                        {art.map((item) => {
                          profitRetailing.push(item.profitRetailing);

                          return (
                            <div key={item.id}>
                              <div className="stroka">
                                {item.profitRetailing}
                              </div>
                            </div>
                          );
                        })}
                        <div className="stroka">
                          итого{": "}
                          {profitRetailing.reduce(function (sum, el) {
                            return sum + el;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="retail groupnom stroka">
                    <div className="block-5 stroka">Wildberries</div>
                    <div className="block-in">
                      <div className="stroka">
                        <button
                          type="button"
                          onClick={() => requestSort("quantityOnWbReserve")}
                          className={getClassNamesFor("quantityOnWbReserve")}
                        >
                          Резерв
                        </button>
                        {art.map((item) => {
                          onWbReserv.push(item.quantityOnWbReserve);

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
                        <div className="stroka">
                          итого{": "}
                          {onWbReserv.reduce(function (sum, el) {
                            return sum + el;
                          })}
                        </div>
                      </div>
                      <div className="stroka">
                        <button
                          type="button"
                          onClick={() => requestSort("quantityOnWbOnWay")}
                          className={getClassNamesFor("quantityOnWbOnWay")}
                        >
                          В пути на
                        </button>
                        {art.map((item) => {
                          onWbOnWay.push(item.quantityOnWbOnWay);

                          return (
                            <div key={item.id}>
                              <div className="stroka">
                                {item.quantityOnWbOnWay}
                              </div>
                            </div>
                          );
                        })}
                        <div className="stroka">
                          итого{": "}
                          {onWbOnWay.reduce(function (sum, el) {
                            return sum + el;
                          })}
                        </div>
                      </div>
                      <div className="stroka">
                        <button
                          type="button"
                          onClick={() => requestSort("quantityOnWbStock")}
                          className={getClassNamesFor("quantityOnWbStock")}
                        >
                          Склад
                        </button>
                        {art.map((item) => {
                          onWbOnStock.push(item.quantityOnWbStock);

                          return (
                            <div key={item.id}>
                              <div className="stroka">
                                {item.quantityOnWbStock}
                              </div>
                            </div>
                          );
                        })}
                        <div className="stroka">
                          итого{": "}
                          {onWbOnStock.reduce(function (sum, el) {
                            return sum + el;
                          })}
                        </div>
                      </div>
                      <div className="stroka">
                        <button
                          type="button"
                          onClick={() =>
                            requestSort("quantityOnWbClientReserve")
                          }
                          className={getClassNamesFor(
                            "quantityOnWbClientReserve"
                          )}
                        >
                          У клиента
                        </button>
                        {art.map((item) => {
                          onWbOnСlientReserve.push(
                            item.quantityOnWbClientReserve
                          );

                          return (
                            <div key={item.id}>
                              <div className="stroka">
                                {item.quantityOnWbClientReserve}
                              </div>
                            </div>
                          );
                        })}
                        <div className="stroka">
                          итого{": "}
                          {onWbOnСlientReserve.reduce(function (sum, el) {
                            return sum + el;
                          })}
                        </div>
                      </div>
                      <div className="stroka">
                        <button
                          type="button"
                          onClick={() => requestSort("quantityOnWbSales")}
                          className={getClassNamesFor("quantityOnWbSales")}
                        >
                          Продажи
                        </button>
                        {art.map((item) => {
                          onWbOnSales.push(item.quantityOnWbSales);
                          return (
                            <div key={item.id}>
                              <div className="stroka">
                                {item.quantityOnWbSales}
                              </div>
                            </div>
                          );
                        })}
                        <div className="stroka">
                          итого{": "}
                          {onWbOnSales.reduce(function (sum, el) {
                            return sum + el;
                          })}
                        </div>
                      </div>
                      <div className="stroka">
                        <button
                          type="button"
                          onClick={() => requestSort("quantityOnWbSalesProfit")}
                          className={getClassNamesFor(
                            "quantityOnWbSalesProfit"
                          )}
                        >
                          Результат
                        </button>
                        {art.map((item) => {
                          onWbOnSalesProfit.push(item.quantityOnWbSalesProfit);

                          return (
                            <div key={item.id}>
                              <div className="stroka">
                                {item.quantityOnWbSalesProfit}
                              </div>
                            </div>
                          );
                        })}
                        <div className="stroka">
                          итого{": "}
                          {onWbOnSalesProfit.reduce(function (sum, el) {
                            return sum + el;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TestTable;
