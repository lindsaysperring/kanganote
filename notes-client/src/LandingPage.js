import React from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup'

import './LandingPage.css'

const LandingPage = () => {

  const SignUpSchema = Yup.object({
    firstName: Yup.string()
    .required("First Name is required"),
    lastName: Yup.string()
    .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters at minimum")
      .required("Password is required")
  });

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
            firstName: '',
            lastName: '',
            email: '',
            password:'',
          }}
          validationSchema={SignUpSchema}
          onSubmit={({ setSubmitting }) => {
            alert("Form is validated!")
            setSubmitting(false)
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
                {errors.email && touched.email && (
                  <p>{errors.email}</p>
                )}
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
                  <button type="submit">
                    Sign Up
                  </button>

                  <p className ="alreadyHaveAnAcc">Already have an account? Click <a href="login">here</a> to log in.</p>
                </div>
              </Form>
            )}

          </Formik>
      </div>
      </div>
    </div>
  )
}

export default LandingPage

