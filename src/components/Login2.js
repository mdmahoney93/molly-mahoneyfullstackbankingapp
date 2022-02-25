//import React, { useState, useContext } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

//styling
import "./Login.css";
// Components

import Card from "./Card";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Login = ({ token, setToken }) => {
  //const loggedIn = props.loggedIn;
  const [status, setStatus] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function formValidation(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <Card
        bgcolor="dark"
        header="Login"
        status={status}
        body={
          !token ? (
            <div>
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
                <button type="submit">Login</button>
              </form>
            </div>
          ) : (
            <>
              <h5>Success</h5>
              <Link to="/deposit">
                <button type="button">Go To Deposits</button>
              </Link>
            </>
          )
        }
      />
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
