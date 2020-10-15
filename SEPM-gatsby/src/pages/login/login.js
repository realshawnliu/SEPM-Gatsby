import React from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
import { Form, Col, Button } from "react-bootstrap"
import style from "styled-components"
import {
  gql, useMutation,
  useQuery
} from '@apollo/client';
import LoginForm from "./loginForm";
// import PropTypes from 'prop-types';


const Error = style.h2`
  color: red;
`

const Confirmation = style.h1`
    color: green;
`

const ALL_USER = gql`
{
  user {
        email
        password
        role_admin
        role_manager
        acct_active
      }
}
`

const confirmationMessage = "";


// loginHandler = ( email, password)=>{}


function Login() {

  const { inputs, handleLogin, loginForm } = LoginForm({
    email: '',
    password: '',
  });


  const { loading, error, data } = useQuery(ALL_USER)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`
  // if (data) console.log(data)


  for (let i = 0; i < data.user.length; i++) {
    const element = data.user[i];
    console.log(element)
  }



  return (
    <div>
      <p>Login page</p>
      <Link to={`/admin/admin-home/`}>admin </Link>

      <Link to={`/staff/staff-home/`}>staff </Link>

      <Link to={`/manager/manager-home/`}>manager</Link>


     

      <Form
        controlId=""

        onSubmit={async e => {
          e.preventDefault();
          // const res = await loginHandle();
          // console.log(res);
          loginForm();
          //display message on front page to show confirm 
        }
        }
      >

        <fieldset disabled={loading} aria-busy={loading} />
        <h2>Login Page</h2>
        {/* {data && data.loginHandle && data.loginHandle.message} */}

        <Confirmation>{confirmationMessage}</Confirmation>

        <div><Error error={error} /></div>


        <Form.Group controlId="">
          <Form.Label>Enter your email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            icon="user circle"
            placeholder="Email"
            value={inputs.email}
            onChange={handleLogin}
            required
          />
        </Form.Group>

        <Form.Group controlId="">
          <Form.Label>Enter your password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            icon="user circle"
            placeholder="password"
            value={inputs.password}
            onChange={handleLogin}
            required
          />
        </Form.Group>

        <Button type="submit">Login</Button>

      </Form>

    </div>
  )
}

export default Login
