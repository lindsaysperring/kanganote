import "./LoginPage.css";

import * as Yup from "yup";

import { Field, Form, Formik } from "formik";
import React, { useContext } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { userContext } from "../Routing";

const LoginPage = () => {
  const SignUpSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters at minimum")
      .required("Password is required"),
  });

  const { setUserData } = useContext(userContext);
  const history = useHistory();

  return (
    <div className="backContainer">
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
              email: "",
              password: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values, { setSubmitting }) => {
              const { email, password } = values;
              axios
                .post("http://localhost:5000/api/auth/login", {
                  email,
                  password,
                })
                .then((res) => {
                  if (res.data) {
                    setUserData({ isLoggedIn: true, user: res.data });
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
                  <label htmlFor="email">Email</label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Enter Your Email"
                  />
                  {errors.email && touched.email && <p>{errors.email}</p>}
                </div>

                <div className="form">
                  <label htmlFor="password">Password</label>
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
                  <button type="submit">
                    Login
                  </button>

                  <p className="dontHaveAnAcc">
                    Don't have an account? Click to{" "}
                    <Link to="/"> Register</Link>
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

export default LoginPage;
