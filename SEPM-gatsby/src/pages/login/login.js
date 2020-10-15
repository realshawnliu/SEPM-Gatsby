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

let passwordCheck = false;




const loginPage = () => {
  const [addAccount] =useMutation(NEW_USER);
  let active = false;
  let adminRoleB = false;
  let managerRoleB = false;
  let managerIdValue = null;
  let role = '';
  let sent = false;
  let errorMessageFromDb;
  let message;

  // const {loading,error,data} = useQuery(LIST_MANAGER);
  // console.log(data);
  // const generateId = () => {
  //     data.user.map((ele) => {const id = ele.user_id
  //     return (
  //         <option
  //             value = {id} label={id}
  //         />
  //     )}
  // )}

  return(
      <Wrap>
          <Layout></Layout>
          <Main>
              <h1>Login Page</h1>
              <Formik
                  initialValues={{
                      email:``,
                      password:``,
                      }}

                  validate={(values, actions) => {
                      let errors={}

                      if(!values.email){
                          errors.email=`email is required`
                      }
                      else if(!values.password){
                          errors.password=`password is required`
                      }
                      else if(values.role === ''){
                          errors.role = `You must choose an account type`
                      }
                      else if(active === false){
                          errors.managerId =`this account is deactivated`

                      }
                      return errors
                  }}

                  validateRoleType={(values) => {
                      let errors;
                      if(values.role === "staff"){
                          if(!values.managerId){
                              errors.managerId =`staff account must provide manager id`
                              console.log(errors)
                          }
                      }    
                      return errors
                  }}

                  // changestatus ={(values) => {
                  //     if(values.role === "admin"){
                  //         adminRoleB = true;
                  //     }
                  //     else if(values.role === "manager"){
                  //         managerRoleB = true;
                  //     }
                  // }}

                  // managerValue ={(values) => {
                  //     if(values.managerId === ""){
                  //         managerIdValue = null;
                  //     }
                  //     else{
                  //         managerIdValue = values.managerId;
                  //         console.log(managerIdValue);
                  //     }
                  // }}

                  
                  onSubmit ={ async (values, actions) => {
                      await new Promise ((r) => setTimeout(r,500));
                  
                      let output={};
                  
                  try {
                      const response = await login({
                          variables: {
                          email: values.email,
                          password: values.password,
                          role_admin: adminRoleB,
                          role_manager: managerRoleB
                      }}).then((data) => {
                          sent = true;
                      })
                  }
                   catch (err) {
                      output.message = err.graphQLErrors[0].message 
                      console.log(output.message)
                      output.type=`error`
                      output.classes = style.fail

                  }

                      if (sent === true ){
                          output.message=`Account successfully created`
                          output.type=`success`
                          output.classes = style.success
                          actions.resetForm()
                      }
                      actions.setStatus(output)
                      actions.setSubmitting(true)
          
                  }}
              >
                  {({ isSubmitting, status, handleChange, handleBlur, values}) => (
                      <Form>
                          <FormWrap>
                              <label>Email</label>
                              <Field type="email" name="email"></Field>
                              <label>password</label>
                              <Field type="password" name="password"></Field>
                              <label>Account type</label>
                              <Field type="radio" name="role" value="staff"></Field> Normal staff 
                              <Field type="radio" name="role" value="manager"></Field> Manager
                              <Field type="radio" name="role" value="admin"></Field> Admin


                              
                              <button type="submit" disabled={isSubmitting}>Submit</button>
                                  <ErrorMessage color='red' name='email' className='field-validation' component='div'/>
                                  <ErrorMessage color='red' name='password' className='field-validation' component='div'/>
                                  <ErrorMessage color='red' name='role' className='field-validation' component='div'/>
                                  <ErrorMessage color='red'name='db' className='field-validation' component='div'/>
                              
                              {status && <div className={status.classes}>{status.message}</div>}
                          </FormWrap>
                      </Form>
                  )}

              </Formik>
          </Main>
      </Wrap>
  )
}

export default loginPage;




// function Login() {

// const { loading, error, data } = useQuery(ALL_USER)
// // if(loading) return 'loading';
// // if(error) {​​​​​​​return error.message}​​​​​​​;
// if (data) console.log(data)

// const userLength = data.user.length

// const loginHandler = ( email, password )=>{
//   for (let i = 0; i < userLength; i++) {
//     // const element = data.user[i];
//     // console.log(element)
//     if(email === data.user[i].email 
//       && password === data.user[i].password){
//       passwordCheck = true
//       console.log("check: ")

//       console.log(passwordCheck)

//     }
//   }
// }

//   // for (let i = 0; i < data.user.length; i++) {
//   //   const element = data.user[i];
//   //   console.log(element)
//   // }


//   const email = "test@gmail.com"
//   const password = "qwerty"
  
//   loginHandler(email, password)


//   return (

//     <div>
//       <p>Login page</p>
//       <Link to={`/admin/admin-home/`}>admin </Link>

//       <Link to={`/staff/staff-home/`}>staff </Link>

//       <Link to={`/manager/manager-home/`}>manager</Link>

      
     

//       <Form
//         controlId=""
//         onSubmit={e => {
//           e.preventDefault();
//           loginHandler(email, password)
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

// export default Login
