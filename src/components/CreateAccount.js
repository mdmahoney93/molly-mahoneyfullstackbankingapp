//import React, { useState, useContext } from "react";
import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  setNestedObjectValues,
} from "formik";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { Modal, Button, Alert } from "react-bootstrap";
import { AllUsersContext } from "../UsersContext";

// Components

import Card from "./Card";

const CreateAccount = ({ children }) => {
  //const loggedIn = props.loggedIn;
  // context
  const updateList = React.useContext(AllUsersContext);
  console.log("React User Context state:");
  console.log(updateList);
  let prevUsers = updateList;

  const [show, setShow] = useState(true);
  const [status, setStatus] = React.useState("");
  const [showPassowrd, setShowPassword] = useState(false);
  const [firstName, lastName, email, password] = "";
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const toggleShowConfirmation = () => setShowConfirmation(!showConfirmation);
  let disabled = true;
  let name = "";
  var createdUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    balance: 0,
    transactions: [],
    token: null,
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const toggleShowPassword = () => {
    setShowPassword(showPassowrd ? false : true);
  };

  function formValidation(field, label) {
    if (!field) {
      setStatus("Oops, you forgot to enter your " + label);
      setTimeout(() => setStatus(""), 3000);

      return false;
    }

    if (label == "password" && field.length < 8) {
      setStatus("Passwords need to be at least 8 characters");
      setTimeout(() => setStatus(""), 3000);
      //console.log(field.length);
      return false;
    }
    //console.log(label);
    //console.log(field);
    return true;
  }

  function CreateUser() {
    //console.log(firstName, lastName, email, password);
    if (!formValidation(firstName, "first name")) return;
    if (!formValidation(lastName, "last name")) return;
    if (!formValidation(email, "email")) return;
    if (!formValidation(password, "password")) return;
    //ctx.push({ firstName, lastName, email, password, balance: 100 });
    setShowConfirmation(true);
    createdUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      balance: 0,
      transactions: [],
      token: "",
    };
    name = firstName;
    console.log(`Assigned ${firstName}`);
    //prevUsers.push(createdUser);
    updateList(createdUser);
    toggleShowConfirmation();
    setTimeout(() => {
      alert(`Thanks for creating an account with us ${firstName}!`);
      //setSubmitting(false);
    }, 400);
    //setSubmitting(false);
    setShow(false);
    updateList.push(createdUser);

    setShowConfirmation(true);
    return <ErrorMessage status="Account Created!" />;
  }

  function handleCreateNewAccount() {
    toggleShowConfirmation();
    setShow(true);
  }

  function handleClose() {
    setShowConfirmation(false);
    <Link to="/login">
      <li className="nav-item">
        <p
          className="nav-link hvr-ripple-out"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Click here to login to your account"
        >
          Login
        </p>
      </li>
    </Link>;
  }

  return (
    <div>
      <Card
        bgcolor="dark"
        header={<h3>Create Account</h3>}
        text={
          show ? (
            <p>
              All fields are required. Enter a valid email address, and a
              password of at least 8 characters.
            </p>
          ) : (
            ""
          )
        }
        status={status}
        body={
          <Formik
            userList={updateList}
            initialValues={initialValues}
            onSubmit={CreateUser}
            validate={(values) => {
              const errors = {};

              if (!values.firstName) {
                disabled = true;
                errors.firstName = "First name is required";
              }
              if (!values.lastName) {
                disabled = true;
                errors.lastName = "Last name is required";
              }
              if (!values.email) {
                disabled = true;
                errors.email = "Email is required";
              }
              if (!values.password) {
                disabled = true;
                errors.password = "Password is required";
              }
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                disabled = true;
                errors.email = "Invalid email address";
              }
              if (values.password.length < 8) {
                errors.password = "Password should be at least 8 characters";
              }

              if (
                (values.firstName &&
                  values.lastName &&
                  values.email &&
                  values.password.length >= 8) == true
              ) {
                //console.log(values.firstName);
                //console.log(values.lastName);
                console.log(values.email);
                console.log(values.password);

                disabled = false;
                console.log(disabled);
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              createdUser = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                balance: 0,
                transactions: [],
                token: null,
              };
              console.log(createdUser);
              console.log(updateList);
              updateList[0].push(createdUser);
              console.log(updateList);
              name = values.firstName;
              setSubmitting(false);
              setTimeout(() => {
                setShowConfirmation(true);
              }, 400);
              resetForm({});
              return createdUser;
            }}
          >
            {({ isSubmitting, validate }) => (
              <Form>
                <h4> First Name </h4>
                <Field type="text" name="firstName" />
                <br />
                <br />
                <h4> Last Name </h4>
                <Field type="text" name="lastName" />
                <br />
                <br />
                <h4> Email</h4>
                <Field type="email" name="email" />
                <br />
                <br />

                <h4> Password </h4>
                <div className="password-wrapper">
                  <Field
                    type={showPassowrd ? "text" : "password"}
                    name="password"
                  />
                  <FaRegEye
                    className="eye-button"
                    onClick={toggleShowPassword}
                  />
                </div>
                <br />
                <br />
                <Button variant="danger" type="reset">
                  Reset
                </Button>
                <Button
                  className="submit-login-button"
                  variant="dark"
                  type="submit"
                  disabled={disabled}
                >
                  Submit
                </Button>
                <br />
                <br />

                <ErrorMessage name="firstName" component="div" />
                <ErrorMessage name="lastName" component="div" />
                <ErrorMessage name="email" component="div" />
                <ErrorMessage name="password" component="div" />
              </Form>
            )}
          </Formik>
        }
      />
      <Modal
        name={firstName}
        show={showConfirmation}
        onClose={toggleShowConfirmation}
      >
        <Modal.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Woohoo! Account Created!</strong>
          <small></small>
        </Modal.Header>
        <Modal.Body name={name}>
          {(name = prevUsers[prevUsers.length - 1].firstName)}
          Thanks for creating an account with us {name}!
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-info"
            variant="primary"
            onClick={handleCreateNewAccount}
          >
            Create another account
          </Button>
          <NavLink to="/login">
            <Button
              className="btn-info"
              variant="primary"
              onClick={handleClose}
            >
              Go to login page
            </Button>
          </NavLink>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateAccount;
