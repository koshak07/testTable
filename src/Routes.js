import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider, { userContext } from "./context/UserContext";
import MainPage from "./pages/MainPage";
import TestTable from "./pages/TestTable";
import AdminPage from "./pages/AdminPage";
import UserStore from "./store/UserStore";
import { observer } from "mobx-react-lite";
import { check } from "./http/userApi";

const MyRoutes = observer(() => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/table" element={<TestTable />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
});

export default MyRoutes;
