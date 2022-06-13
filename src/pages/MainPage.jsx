import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Card, Container, Form, FormControl } from "react-bootstrap";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";
import { login, registration } from "../http/userApi";

const MainPage = observer(() => {
  let locate = useLocation();
  // console.log(locate);
  const { user } = useContext(userContext);

  const [userName, setUserName] = useState(" ");
  const [password, setPassword] = useState(" ");

  //registration
  // const click = async () => {
  //   let userData;
  //   userData = await registration(userName, password);
  //   user.setUserName(user);
  //   user.setIsAuth(true);
  // };
  const navigate = useNavigate();
  const click = async () => {
    try {
      let data;
      data = await login(userName, password);
      // user.setUserName(user);
      user.setIsAuth(true);

      navigate("/table");
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 54 }}
      >
        <Card style={{ width: 600 }} className="p-5">
          <h2>Autorization</h2>
          <Form className="d-flex flex-column">
            <FormControl
              className="mt-2 fs-8 form-control-sm"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <FormControl
              className="mt-2 form-control-sm"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={click}
              className="mt-3 align-self-end"
              variant={"outline-success"}
            >
              Enter
            </Button>
          </Form>
        </Card>

        {user.isAuth ? (
          <div>
            <Link to="/table">
              <Button>To Table</Button>
            </Link>
            <Link to="/admin">
              <Button>To admin</Button>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </Container>
    </div>
  );
});

export default MainPage;
