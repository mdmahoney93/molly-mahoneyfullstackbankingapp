import React, { useState, useContext } from "react";
import Card from "./Card";
import "./Login.css";
import { AllUsersContext } from "../UsersContext";
import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

import UserProvider, { UserContext } from "../UserContext";

export default function Login({ token, setToken }) {
  const [updateList, setUpdateList] = React.useContext(AllUsersContext);
  const [currentUser, setCurrentUser] = React.useContext(UserContext);
  const [username, setEmail] = useState();
  const [password, setPassword] = useState();
  const [failedLogin, setFailedLogin] = useState("");

  console.log(failedLogin);

  let show = currentUser.token == null;
  console.log(show);
  console.log(currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = loginUser({
      username,
      password,
      updateList,
    });
    console.log(token); //should be null prelogin

    console.log(currentUser);
    show = currentUser.token == null;
  };

  const loginUser = () => {
    const userFound = updateList.find(function (userArray) {
      return userArray.email === username;
    });

    if (!userFound) {
      setFailedLogin(
        "Either the username or password you entered were incorrect. Please, try again."
      );
      setTimeout(() => setFailedLogin(""), 3000);
      return null;
    }

    const checkPassword = () => {
      if (userFound.password === password) {
        console.log("login success");
        return "Success";
      } else {
        console.log("Failed login");

        return "Failed";
      }
    };

    const verify = checkPassword({
      userFound,
      password,
    });

    if (verify === "Success") {
      console.log("return token");
      userFound.token = "test123";
      console.log(userFound);
      setCurrentUser(userFound);
      console.log(currentUser);
      return "test123";
    }
    if (verify === "Failed") {
      setFailedLogin(
        "Either the username or password you entered were incorrect. Please, try again."
      );
      setTimeout(() => setFailedLogin(""), 3000);
      return null;
    } else {
      console.log("return null");
      return null;
    }
  };

  return (
    <div>
      {show ? (
        <div>
          <Card
            bgcolor="dark"
            header="Please Log In"
            status={
              <div>
                <br />
                {failedLogin}
              </div>
            }
            body={
              <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                  <label>
                    <p>Email</p>
                    <input
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label>
                    <p>Password</p>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                  <div>
                    <Button variant="dark" type="submit">
                      Login
                    </Button>
                  </div>
                </form>
              </div>
            }
          ></Card>
        </div>
      ) : (
        <Card
          bgcolor="dark"
          header={
            <h3>
              {" "}
              Hey, {currentUser.firstName} {currentUser.lastName}! You've
              successfully logged in!
            </h3>
          }
          //status={status}
          body={
            <div className="login-wrapper">
              <div>
                <NavLink to="/balance">
                  <Button className="btn-info" variant="primary">
                    Check your balance
                  </Button>
                </NavLink>
              </div>
            </div>
          }
        ></Card>
      )}
    </div>
  );
}
