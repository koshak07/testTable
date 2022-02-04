import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <Link to="/table">
        <Button>To Table</Button>
      </Link>
    </div>
  );
};

export default MainPage;
