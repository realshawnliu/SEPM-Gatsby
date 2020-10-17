import React from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
// import { Form, Col, Button } from "react-bootstrap"
import style from "styled-components"
import {
  gql, useMutation,
  useQuery
} from '@apollo/client';
// import PropTypes from 'prop-types';
import { Formik, Form, Field, errors, ErrorMessage } from 'formik';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Error = style.h2`
  color: red;
`

const Confirmation = style.h1`
    color: green;
`

const Main = style.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3em;
`

const FormWrap = style.div`
    display:flex;
    flex-direction: column;
    width: 100%;
`

const ALL_USER = gql`
{
  user {
        user_id
        role_manager
        role_admin
        password
        manager_id
        last_name
        first_name
        email
        acct_active
      }
}
`

const LoginPage = () => {
  const { loading, error, data } = useQuery(ALL_USER)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`
  // if (data) console.log(data)

  let loginCheck = false;

  const loginHandler = (email, password, role) => {
    for (let i = 0; i < data.user.length; i++) {
      if (email === data.user[i].email
        && password === data.user[i].password) {
        if (data.user[i].acct_active === false) {
          console.log("this account is deactivate")
        }
        else {
          if (role === "staff") {
            loginCheck = true
            var newWindow = window.open(`/staff/staff-home/`)
            newWindow.userData = data.user[i]
          }
          else if (role === "manager"
            && data.user[i].role_manager === true) {
            loginCheck = true
            var newWindow = window.open(`/manager/manager-home/`)
            newWindow.userData = data.user[i]
          }
          else if (role === "admin"
            && data.user[i].role_admin === true) {
            loginCheck = true
            var newWindow = window.open(`/admin/admin-home/`)
            newWindow.userData = data.user[i]
          }
        }
      }
      if (loginCheck === true) {
        console.log("login successfully")
      }
      else {
        console.log("login failed")
        // return(
        //   <Popup trigger={<button> Trigger</button>} position="right center">
        //   <div>Popup content here !!</div>
        // </Popup>
        // )
      }
    }
  }

  return (
    <Main>
      {/* <Link to={`/admin/admin-home/`}>admin </Link>
      <Link to={`/staff/staff-home/`}>staff </Link>
      <Link to={`/manager/manager-home/`}>manager</Link> */}

      <h1>Login Page</h1>
      <Formik
        initialValues={{
          email: ``,
          password: ``,
        }}

        validate={(values, actions) => {
          let errors = {}

          if (!values.email) {
            errors.email = `email is required`
          }
          else if (!values.password) {
            errors.password = `password is required`
          }
          else if (values.role === '') {
            errors.role = `You must choose an account type`
          }
          return errors
        }}

        onSubmit={async (values, actions) => {
          await new Promise((r) => setTimeout(r, 500));

          try {
            loginHandler(values.email, values.password, values.role)
          }
          catch (err) {
            console.log(err)
          }

          if (loginCheck === true) {
            let message = {}
            message.email = `login successfully`
          }
        }}
      >
        {({ isSubmitting, status, handleChange, handleBlur, values }) => (
          <Form>
            <FormWrap>
              <label>Email</label>
              <Field type="email" name="email"></Field>
              <label>password</label>
              <Field type="password" name="password"></Field>
              <label>Account type: </label>
              <Field type="radio" name="role" value="staff"></Field> Normal staff
              <Field type="radio" name="role" value="manager"></Field> Manager
              <Field type="radio" name="role" value="admin"></Field> Admin
              <button type="submit" disabled={isSubmitting}>Login</button>
              <ErrorMessage color='red' name='email' className='field-validation' component='div' />
              <ErrorMessage color='red' name='password' className='field-validation' component='div' />
              <ErrorMessage color='red' name='role' className='field-validation' component='div' />
              <ErrorMessage color='red' name='db' className='field-validation' component='div' />

              {status && <div className={status.classes}>{status.message}</div>}
            </FormWrap>
          </Form>
        )}
      </Formik>
    </Main>
  )
}


export default LoginPage