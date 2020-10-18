import React from "react"
import styled from "styled-components"
import {gql, useMutation} from '@apollo/client';
import useForm from "./useForm";
import style from "../admin/showUser.module.css";
import { Formik, Form, Field, errors, ErrorMessage } from 'formik';

//style
const FormWrap = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
`


//query
const UPDATE_PASSWORD = gql`
mutation($user_id: uuid!, $password: String!) {
  UpdatePassword(user_id: $user_id, password: $password) {
    affected_rows
  }
}
`;

const confirmationMessage = "";

function Reset({ userData }) {
    let sent = false;
    var pattern = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&+?><)(])[\w$*&+?><)(]{10,}$/;
    const userID = userData.user_id

//   const { inputs, handleChange, resetForm } = useForm({
//     password: '',
//     confirmPassword: '',
//   });

//   const [resetPassword, { error, loading, data }] = useMutation(UPDATE_PASSWORD, {
//     variables: {
//       user_id: userID,
//       password: inputs.password,
//     }
//   })

const [resetPassword] = useMutation(UPDATE_PASSWORD);

  return (
    <Formik
        initialValues={{
            password:``,
            confirmPassword: ``
        }}

        validate={(values) =>{
            let errors={}

            if(!values.password){
                errors.password = `please enter new password`
            }
            else if(!pattern.test(values.password)){
                errors.password = `Passwords should be at least 10 characters, including upper and lower case letters, digits and at least one special character out of !, $ *, &, +, ?, <, >, (, )`
            }
            else if(!values.confirmPassword){
                errors.confirmPassword = `Please re-enter password`
            }
            else if(values.confirmPassword != values.password){
                errors.confirmPassword = `confirm password does not match new password`
            }
            return errors
        }}

        onSubmit={ async (values, actions) =>{
            let output={};
            await new Promise ((r) => setTimeout(r,500));
            try{
                await resetPassword({
                    variables:{
                        user_id: userID,
                        password: values.password
                    }
                }).then((data) =>{
                    sent =true;
                })
            }
            catch(err){
                output.message = err.graphQLErrors[0].message 
                console.log(output.message)
                output.type=`error`
                output.classes = style.fail
            }

            if (sent === true ){
                output.message=`Password Changed`
                output.type=`success`
                output.classes = style.success
                actions.resetForm()
            }
            actions.setStatus(output)
            actions.setSubmitting(true)

        }}
    >

        {({ isSubmitting, status, handleChange, values}) => (
            <Form>
                <FormWrap>
                {status && <div className={status.classes}>{status.message}</div>}
                <h1>Change Your Password</h1>
      
                <label>Enter new password</label>
                <Field
                    className={style.input}
                    type="password"
                    name="password"
                    icon="user circle"
                    placeholder="Enter new password"
                />
                <ErrorMessage name='password' className={style.fail} component='div'/>
        
                <label>Confirm new password</label>
                <Field
                    className={style.input}
                    type="password"
                    name="confirmPassword"
                    icon="user circle"
                    placeholder="Renter new password"
                    required
                />
                <ErrorMessage name='confirmPassword' className={style.fail} component='div'/>
            
                <button className={style.submitBtn} type="submit" disabled={isSubmitting} >Confirm</button>
                </FormWrap>
          </Form>

        )}
        


    </Formik>
    
  )
}

export default Reset