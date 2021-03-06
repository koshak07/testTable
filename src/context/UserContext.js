import axios from "axios";
import React, { createContext, useReducer, useState } from "react";
import { APINOM } from "../helpers/const";
import UserStore from "../store/UserStore";
import DataStore from "../store/DataStore";

export const userContext = createContext();
const INIT_STATE = {
  products: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    try {
      let filter = window.location.search;
      const response = await axios(`${APINOM}${filter}`);
      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <userContext.Provider
      value={{
        getProducts,
        products: state.products,

        user: new UserStore(),
        nomenclature: new DataStore(),
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
