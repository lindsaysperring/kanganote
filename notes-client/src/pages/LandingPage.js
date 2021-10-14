import "./LandingPage.css";

import * as Yup from "yup";

import { Field, Form, Formik } from "formik";
import { Link, Redirect, useHistory } from "react-router-dom";
import React, { useContext } from "react";

import axios from "axios";
import { baseURL } from "../utils/config";
import { userContext } from "../Routing";

const LandingPage = () => {
  const SignUpSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters at minimum")
      .required("Password is required"),
  });
  const { userData, setUserData } = useContext(userContext);
  const history = useHistory();
  return (
    <div className="backContainer">
      {userData.isLoggedIn && <Redirect to="/home" />}
      <div className="columns">
        <div className="info">
          <h1> Welcome to Kanganote! </h1>
          <li>Easy note taking </li>
          <li>Quick access</li>
          <li>Cloud storage</li>
        </div>
        <div className="form">
          <h1>Sign up here</h1>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values, { setSubmitting }) => {
              axios
                .post(`${baseURL}/api/auth/register`, {
                  name: `${values.firstName} ${values.lastName}`,
                  email: values.email,
                  password: values.password,
                })
                .then((res) => {
                  if (res.data) {
                    setUserData({ user: res.data, isLoggedIn: true });
                    history.push("/home");
                  }
                })
                .catch((err) => {
                  alert(`Something went wrong. ${err}`);
                });
              setSubmitting(false);
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <div className="form">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="Enter Your First Name"
                  />
                  {errors.firstName && touched.firstName && (
                    <p>{errors.firstName}</p>
                  )}
                </div>

                <div className="form">
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Enter Your Last Name"
                  />
                  {errors.lastName && touched.lastName && (
                    <p>{errors.lastName}</p>
                  )}
                </div>

                <div className="form">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Enter Your Email"
                  />
                  {errors.email && touched.email && <p>{errors.email}</p>}
                </div>

                <div className="form">
                  <label htmlFor="password">Create a Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                  />
                  {errors.password && touched.password && (
                    <p>{errors.password}</p>
                  )}
                </div>
                <div className="button">
                  <button type="submit">Sign Up</button>

                  <p className="alreadyHaveAnAcc">
                    Already have an account? Click to{" "}
                    <Link to="/login">Login</Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
