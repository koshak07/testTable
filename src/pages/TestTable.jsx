import { Button, checkboxClasses } from "@mui/material";
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

  let uniquePhotoArr = unique(arrPhoto);
  // console.log(uniquePhotoArr);

  // function uniquePhoto(arr) {
  //   let result = [];

  //   for (let str of arr) {
  //     if (!result.includes(str)) {
  //       result.push(str);
  //     }
  //   }

  //   return result;
  // }
  // let uniquePhotoArr1 = uniquePhoto(uniquePhotoArr);
  // console.log(uniquePhotoArr1);

  let uniquePhotoArr1 = uniqueNameArr.map((elem) => {
    return uniquePhotoArr.find((i) => {
      if (i.includes(elem)) {
        let res = [];
        for (let str of uniquePhotoArr) {
          if (str.includes(elem)) {
            res.push(str);
          }
        }
        for (let str1 of res) {
          let resUnique = [];

          resUnique.push(res.find((str1) => str1.includes(elem)));
        }
        // console.log(res);
        return res;
      }
    });
  });

  // need resolv firstCost and erp

  // let art = filterByArt(myArray, uniqueNameArr[0]);

  // let uniqueFirstcost = art.map((elem) => {
  //   return art.find((i) => {
  //     if (i.artModel === elem) {
  //       let res = [];
  //       for (let str of art) {
  //         if (str.includes(elem)) {
  //           res.push(str);
  //         }
  //       }
  //       for (let str1 of res) {
  //         let resUnique = [];

  //         resUnique.push(res.find((str1) => str1.includes(elem)));
  //       }
  //       console.log(res);
  //       return res;
  //     }
  //   });
  // });
  // console.log(uniqueFirstcost);

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

  return (
    <>
      <Link to="/">
        <Button>To Main</Button>
      </Link>
      <h1>Table</h1>
      <div className="table-test">
        {uniqueNameArr.map((elem) => {
          let art = filterByArt(myArray, elem);

          return (
            <div className="one-art stroka" key={elem}>
              <div className="art-data stroka">
                <div className="art-number">{elem}</div>

                <div className="photo">
                  {uniquePhotoArr1.map((i) => {
                    if (i.includes(elem)) {
                      return (
                        <div className="" key={i}>
                          <img width={100} src={i} alt="" />
                        </div>
                      );
                    }
                  })}
                </div>
                <div>
                  {art.map((i) => {
                    if (i.artModel.includes(elem)) {
                      return (
                        <div className="" key={i}>
                          {i.firstCost}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="nomenclature">
                {art.map((item) => {
                  let col = item.color;
                  let size = item.size;
                  let cost = item.quantityOnProductionPlan;
                  return (
                    <div key={item.id}>
                      <div className="col-sizes">
                        <div className="stroka"> Цвет {col}</div>
                        <div className="stroka"> Размер {size}</div>
                        <div className="stroka"> В плане {cost}</div>
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
