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
    console.log(sortConfig);

    // console.log(art);
    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items].sort(sortfunctionColor);
      // console.log(sortableItems);

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
      // console.log(sortableItems);
      return sortableItems;

      // console.log(items);
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
    // console.log(sortConfig);

    return { items: sortedItems, requestSort, sortConfig };
  };
  /////
  let colorArr = uniqueNameArr.map((elem) => {
    let res = [];
    let art = filterByArt(myArray, elem);

    return art;
  });
  // console.log(colorArr);
  const { items, requestSort, sortConfig } = useSortableData(myArray);
  // let arr = items.map((i) => {
  //   console.log(i);
  //   return i;
  // });
  console.log(items);
  // console.log(sortConfig);
  // console.log(requestSort);
  // console.log(useSortableData(colorArr));
  const getClassNamesFor = (color) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === color ? sortConfig.direction : undefined;
  };
  console.log(sortConfig);

  // const [sortArr, setSortArr] = useState(colorArr);
  // console.log(sortArr);

  // const [sortColArr, setSortColArr] = useState(colorArr);
  // // console.log(sortColArr);
  // let handler = () => {
  //   let sorted = sortColArr;
  //   sorted.sort(sortfunctionColor);
  //   // console.log(sorted);
  //   setSortColArr(sorted);
  // };

  //////

  function sortfunctionColor(a, b) {
    // console.log(a);
    if (a.color < b.color) return -1;

    if (a.color > b.color) return 1;
    if (a.size < b.size) return -1;

    if (a.size > b.size) return 1;

    return 0;
  }

  function sortfunctionStockMain(a, b) {
    if (a.quantityOnStockMain < b.quantityOnStockMain) return -1;

    if (a.quantityOnStockMain > b.quantityOnStockMain) return 1;

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
            console.log(art);
            items.map((art) => {});

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
                        Цвет{" "}
                        <button
                          type="button"
                          onClick={() => requestSort("color")}
                          className={getClassNamesFor("color")}
                        >
                          Color
                        </button>
                        {art.map((item, index) => {
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
                          // console.log(item.size);
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
                              <div className="stroka">
                                {item.profitRetailing}
                              </div>
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
      </div>
    </>
  );
};

export default TestTable;
