// import React from "react"
// // import { css } from "@emotion/core"
// import { Link } from "gatsby"
// import { Form, Col, Button } from "react-bootstrap"
// import style from "styled-components"
// import {
//   gql, useMutation,
//   useQuery
// } from '@apollo/client';

// const Error = style.h2`
//   color: red;
// `

// const Confirmation = style.h1`
//     color: green;
// `


// const ALL_USER = gql`
// {
//   user {
//         email
//         password
//         role_admin
//         role_manager
//         acct_active
//       }
// }
// `

// const confirmationMessage = "";

// let passwordCheck = false;


// export default function LoginPage() {

//   const { loading, error, data } = useQuery(ALL_USER)
//   if (loading) return "loading..."
//   if (error) return `Error! ${error.message}`
//   if (data) console.log(data)

//   // console.log(data.user)


//   const loginHandler = (email, password) => {
//     for (let i = 0; i < data.user.length; i++) {
//       if (email === data.user[i].email
//         && password === data.user[i].password) {
//         passwordCheck = true
//         // console.log("check: ")
//         // console.log(passwordCheck)

//       }
//     }
//   }

//   // for (let i = 0; i < data.user.length; i++) {
//   //   const element = data.user[i];
//   //   console.log(element)
//   // }


//   // const email = "test@gmail.com"
//   // const password = "qwerty"

//   return (
//     <div>
//       <Link to={`/admin/admin-home/`}>admin </Link>

//       <Link to={`/staff/staff-home/`}>staff </Link>

//       <Link to={`/manager/manager-home/`}>manager</Link>


//       <Form
//         controlId=""
//         onSubmit={e => {
//           e.preventDefault();
//           // loginHandler(email, password)
//           //display message on front page to show confirm 
//         }
//         }
//       >

//         <fieldset disabled={loading} aria-busy={loading} />
//         <h2>Login Page</h2>
//         {/* {data && data.loginHandle && data.loginHandle.message} */}

//         <Confirmation>{confirmationMessage}</Confirmation>

//         <div><Error error={error} /></div>

//         <Form.Group controlId="email">
//           <Form.Label>Enter your email</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             placeholder="Email"
//             // value={email}
//             // value="test@gmail.com"
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="password">
//           <Form.Label>Enter your password</Form.Label>
//           <Form.Control
//             type="password"
//             name="password"
//             placeholder="password"
//             // value={password}
//             // value="qwerty"
//             required
//           />
//         </Form.Group>

//         <Button type="submit">Login</Button>

//       </Form>

//     </div>
//   )
// }

