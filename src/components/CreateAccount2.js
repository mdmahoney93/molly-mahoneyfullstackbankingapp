//import React, { useState, useContext } from "react";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toast, Button } from "react-bootstrap";
import { AllUsersContext } from "../UsersContext";

// Components

import Card from "./Card";

export const CreateAccount = () => {
  const [userList, setUserList] = React.useContext(AllUsersContext);

  const formFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  return (
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik
        userList={userList}
        setUserList={setUserList}
        initialValues={formFields}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "First name is required";
          }
          if (!values.lastName) {
            errors.lastName = "Last name is required";
          }

          if (values.password.length < 8) {
            errors.password = "Password should be at least 8 characters";
          }
          if (!values.password) {
            errors.password = "Password is required";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(
          values,
          prevUsers,
          userList,
          setUserList,
          { setSubmitting }
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          userList,
          setUserList,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              placeholder="Enter your first name"
              type="text"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              placeholder="Enter your last name"
              type="lastName"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="Enter your email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Enter your password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <ErrorMessage name="firstName" component="div" />
            <ErrorMessage name="lastName" component="div" />
            <ErrorMessage name="email" component="div" />
            <ErrorMessage name="password" component="div" />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAccount;
