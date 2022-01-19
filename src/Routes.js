import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import MainPage from "./pages/MainPage";
import TestTable from "./pages/TestTable";

const MyRoutes = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/table" element={<TestTable />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default MyRoutes;
