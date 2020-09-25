import React from "react"
import { Form, Col, Button, FormControl } from "react-bootstrap"
import style from "styled-components"
import {gql , useMutation, useQuery} from '@apollo/client';
import useForm from "./useForm";
import PropTypes from 'prop-types';
//style

const Error = style.h2`
  color: red;
`

const Confirmation = style.h1`
    color: green;
`

//query
const UPDATE_PASSWORD = gql`
mutation($user_id: uuid!, $password: String!) {
  UpdatePassword(user_id: $user_id, password: $password) {
    affected_rows
  }
}
`;

const username = "\"068dfbe3-e725-4ab2-aac9-307dd6659b22\"";
const confirmationMessage="";

function Reset(){

  const {inputs, handleChange, resetForm} = useForm({
    password : '',
    confirmPassword: '',
  });

  const [resetPassword, {error, loading, data}] = useMutation(UPDATE_PASSWORD, {
    variables: {
      //currently hardcoded 
      user_id: "068dfbe3-e725-4ab2-aac9-307dd6659b22",
      password: inputs.password,
  }})

  return (

            <Form
                controlId=""
                
                onSubmit ={async e => {
                        e.preventDefault();
                        const res = await resetPassword();
                        console.log(res);
                        resetForm();
                        //display message on front page to show confirm 
                }
                }
                // onSubmit={(e) => {
                //   e.preventDefault();
                //   updatePassword({
                //     variables: {
                //       //currently hardcoded 
                //       user_id: "068dfbe3-e725-4ab2-aac9-307dd6659b22",
                //       password: "change2",
                //   },
                //   }).then((data) => {
                //       console.log("password has been changed")

                //   })
                //   .catch((e) => {
                //       console.log(e)
                //   });
                // }}
            >
              <fieldset disabled={loading} aria-busy={loading}/>
                <h2>Reset Your Password</h2>
                {data && data.resetPassword && data.resetPassword.message}
                
            <Confirmation>{confirmationMessage }</Confirmation>
            
            <div><Error error={error}/></div>
              

            <Form.Group controlId="">
              <Form.Label>New password</Form.Label>
              <Form.Control
              type="password" 
              name="password"
              icon="user circle"
              placeholder="Enter new password" 
              value={inputs.password}
              onChange={handleChange} 
              required
            />
            </Form.Group>

            <Form.Group controlId="">
              <Form.Label>Confirm new password</Form.Label>
              <Form.Control 
              type="password" 
              name="confirmPassword"
              icon="user circle"
              placeholder="Renter new password" 
              value={inputs.confirmPassword}
              onChange={handleChange}
              required
            />
            </Form.Group>

              <Button type="submit">reset</Button>
            {/* <Popup trigger={<button onClick={submitHandler}> Trigger</button>} position="right center">
              <div>Popup content here !!</div>
            </Popup> */}
          </Form>

  )
}

export default Reset