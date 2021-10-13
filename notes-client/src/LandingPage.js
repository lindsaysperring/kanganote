import React from 'react'
import { Formik, Field, Form } from "formik";

import './LandingPage.css'

const LandingPage = () => {

  return (
    <div className="backContainer">
      <div className="columns">
      <div className="info">
        <h1> This is our Note taking website TITLE </h1>
        <h3> intro text</h3>
        <h3> intro img</h3>
      </div>
      <div className="form">
        <h1>This is the sign up form</h1>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password:'',
          }}
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
                    Sign Up
                  </button>
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

