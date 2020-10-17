import React from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
// import { Form, Col, Button } from "react-bootstrap"
import styled from "styled-components";
import {gql, useMutation,useQuery} from '@apollo/client';
// import PropTypes from 'prop-types';
import style from "../admin/createAccount.module.css";
import { Formik, Form, Field, errors, ErrorMessage } from 'formik';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Error = styled.h2`
  color: red;
`

const Confirmation = styled.h1`
    color: green;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2em;
    height: 100vh;
    border: white;
    webkit-box-shadow: 10px 10px 30px 0px rgba(240,231,240,0.77);
    -moz-box-shadow: 10px 10px 30px 0px rgba(240,231,240,0.77);
    box-shadow: 10px 10px 30px 0px rgba(240,231,240,0.77);
    width: 100%;
    align-item: center;
`
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: row;
`
const Title = styled.div`
  display: flex;
  margin: 30px;
  justify-content: center;
`
const FormWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 60%;

`
const Box = styled.div`
  -webkit-box-shadow: 20px 20px 20px -16px rgba(250,250,250,1);
  -moz-box-shadow: 20px 20px 20px -16px rgba(250,250,250,1);
  box-shadow: 20px 20px 20px -16px rgba(250,250,250,1);
  width: 60%;
  border: 1px solid white;
  border-radius: 30px;
  margin-left: 20%;
  margin-right: 20%;
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
        annual_notify
      }
}
`

const LoginPage = () => {
  let output = {}

  const { loading, error, data } = useQuery(ALL_USER)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`
  // if (data) console.log(data)

  let loginCheck = false;

  const loginHandler = (email, password, role) => {
    for (let i = 0; i < data.user.length; i++) {
      if (email === data.user[i].email
        && password === data.user[i].password) {

          console.log(data.user[i])
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
        output.message= `login successfully`;
        output.classes= style.success

      }
      else {
        console.log("login unsuccessfully")
        output.message =`login unsuccessfully`;
        output.classes = style.fail;
      }
    }
  }

  return (
    <Main>
      <Box>
        <Title>
          <h1>Login Page</h1>
        </Title>
        <Wrap>

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
                output.message=err.graphQLErrors[0].message
                output.classes = style.fail
              }

              if (loginCheck === true) {
                
                output.message = `login successfully`
                output.type=`success`
                output.classes= style.success
              }
              actions.setStatus(output)
              actions.setSubmitting(true)
            }}
          >
            {({ isSubmitting, status, handleChange, handleBlur, values }) => (
            
              <Form>
                <FormWrap>
                  <label>Email</label>
                  <Field className={style.input} type="email" name="email"></Field>
                  <label>password</label>
                  <Field className={style.input} type="password" name="password"></Field>
                  <label>Account type: </label>
                  <Field type="radio" name="role" value="staff"></Field> Normal staff
                  <Field type="radio" name="role" value="manager"></Field> Manager
                  <Field type="radio" name="role" value="admin"></Field> Admin
                  <button type="submit" disabled={isSubmitting}>Login</button>
                  <ErrorMessage  name='email' className={style.fail} component='div' />
                  <ErrorMessage  name='password' className={style.fail} component='div' />
                  <ErrorMessage  name='role' className={style.fail} component='div' />
                  <ErrorMessage  name='db' className={style.fail} component='div' />

                  {status && <div className={status.classes}>{status.message}</div>}
                </FormWrap>
              </Form>
            )}
          </Formik>
        </Wrap>
      </Box>
      
    </Main>
  )
}


export default LoginPage