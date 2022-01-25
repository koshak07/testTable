import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/UserContext";
var _ = require("lodash");

const TestTable = () => {
  const { getProducts, products } = useContext(userContext);
  useEffect(() => {
    getProducts();
  }, []);

  // products.map((item) => {
  //   let objModel = item;

  // console.log(objModel);
  // console.log(objModel.color);
  // });

  _.groupBy(products, function (item) {
    let modelObj = {
      id: item.id,
      image: item.image,
      artModel: item.artModel,
      firstCost: item.firstCost,
      color: item.color,
      size: item.size,
      quantityOnStock: item.quantityOnStock,
      quantityOnWb: item.quantityOnWb,
      quantityOnOzon: item.quantityOnOzon,
    };
    let {
      id,
      image,
      artModel,
      firstCost,
      color,
      size,
      quantityOnStock,
      quantityOnWb,
      quantityOnOzon,
    } = modelObj;

    for (let index = 0; index <= modelObj.length; index++) {
      console.log(index);
      // if ((index = artModel)) {
      //   console.log(size);
      // }
    }

    // if (artModel === artModel) {
    //   console.log(
    //     modelObj,
    //     color,
    //     size,
    //     quantityOnStock,
    //     quantityOnWb,
    //     quantityOnOzon
    //   );
    // }
    // return modelObj;
  });

  // _.groupBy([products], "artModel");

  return (
    <>
      <Link to="/">
        <Button>To Main</Button>
      </Link>
      <h1>Table</h1>
      <div className="table-test">
        <div>
          <div className="thead">
            {/* <div className="thead-in">Номер модели</div> */}
            {/* <div className="thead-in">Фото</div> */}
            {/* <div className="thead-in">Цвет</div> */}
            {/* <div className="thead-in">Размер</div> */}
            {/* <div className="thead-in">Количество на складе</div> */}
            {/* <div className="thead-in">Количество на Вайлдбириз</div> */}
            {/* <div className="thead-in">Количество на Озон</div> */}
          </div>

          <div className="tbody">
            {products.map((item) => (
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
                    <div className="stroka">{item.color}</div>
                  </div>
                  <div className="art-size">
                    <div className="thead-in">Размер</div>
                    <div className="stroka">{item.size}</div>
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
