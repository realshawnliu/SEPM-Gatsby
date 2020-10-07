import React from 'react';
import { Formik, Form, Field, errors, ErrorMessage } from 'formik';
import { gql, useMutation} from '@apollo/client';
import Layout from "../../components/admin-layout"
import styled from "styled-components";

const NEW_USER = gql`
mutation($first_name: String!, $last_name: String!, $email: String!, $password: String!, $manager_id: uuid, $role_manager: Boolean!, $role_admin: Boolean!) {
  NewUser(first_name: $first_name, last_name: $last_name, email: $email, manager_id: $manager_id, password: $password, role_admin: $role_admin, role_manager: $role_manager) {
    affected_rows
  }
}
`;

const FormWrap = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
`
const ErrorBox = styled.div`
    width: 100%;
`
const Wrap= styled.div`
    display: flex;
    flex-direction: row;
`

const CreateAccount = () => {
    const [addAccount] =useMutation(NEW_USER);
    let adminRoleB = false;
    let managerRoleB = false;
    let managerIdValue = null;
    let sent = false;
    let errorMessageFromDb;
    let message;


    return(
        <Wrap>
            <Layout></Layout>
            <h1>Create new account</h1>
            <Formik
                initialValues={{
                    firstName:``,
                    lastName:``,
                    email:``,
                    managerId:``,
                    password:``,
                    role:``
                    }}

                validate={(values, actions) => {
                    let errors={}

                    if(values.role === "manager"){
                        managerRoleB = true;
                    }
                    else if (values.role === "admin"){
                        adminRoleB = true;
                    }

                    if(!values.firstName){
                        errors.firstName=`First name is required`
                    }
                    else if(!values.lastName){
                        errors.lastName=`Last name is required`
                    }
                    else if(!values.email){
                        errors.email=`email is required`
                    }
                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    else if(!values.password){
                        errors.password=`password is required`
                    }
                    else if(!values.role){
                        errors.role = `You must choose an account type`
                    }
                    else if(!values.managerId && values.role === "staff"){
                        errors.managerId =`staff account must provide manager id`

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

                changestatus ={(values) => {
                    if(values.role === "admin"){
                        adminRoleB = true;
                    }
                    else if(values.role === "manager"){
                        managerRoleB = true;
                    }
                }}

                managerValue ={(values) => {
                    if(values.managerId === ""){
                        managerIdValue = null;
                    }
                }}

                
                onSubmit ={ async (values, actions) => {
                    await new Promise ((r) => setTimeout(r,500));
                    let output=``
                
                   try {
                       const response = await addAccount({
                        variables: {
                          first_name: values.firstName,
                          last_name: values.lastName,
                          email: values.email,
                          manager_id: managerIdValue,
                          password: values.password,
                          role_admin: adminRoleB,
                          role_manager: managerRoleB
                      }})
                      console.log(response);
                   } catch (err) {
                      message = err.graphQLErrors[0].message 
                      console.log(message)
                      return message
                   }
                    // addAccount({
                    //     variables: {
                    //       first_name: values.firstName,
                    //       last_name: values.lastName,
                    //       email: values.email,
                    //       manager_id: managerIdValue,
                    //       password: values.password,
                    //       role_admin: adminRoleB,
                    //       role_manager: managerRoleB
                    //   },
                    // }).then((data) => {
                    //     console.log("account has been created")
                    //     sent = true;

                    // })
                    // .catch((e) => {
                    //     console.log(e.graphQLErrors[0].message)
                    //     errorMessageFromDb = JSON.stringify(e.graphQLErrors[0].message);
                    //     return errorMessageFromDb
                    // });

                    if (sent === true ){
                        actions.setStatus({success: 'success'})
                        actions.resetForm()
                    }
                    
                    actions.setSubmitting(true)
                    // const response = await 
                    // if(response.success){
                    //     actions.resetForm();
                    // } else {
                    //     output = `Error`
                    // }
                    
                    actions.setStatus({
                        message: output
                    })
                }}
            >
                {({ isSubmitting, status}) => (
                    <Form>
                        <FormWrap>
                            <label>First name</label>
                            <Field type ="text" name="firstName"></Field>
                            <label>Last name</label>
                            <Field type="text" name="lastName"></Field>
                            <label>Email</label>
                            <Field type="email" name="email"></Field>
                            <label>password</label>
                            <Field type="password" name="password"></Field>
                            <label>Account type</label>
                            <Field type="radio" name="role" value="staff"></Field> Normal staff 
                            <Field type="radio" name="role" value="manager"></Field> Manager
                            <Field type="radio" name="role" value="admin"></Field> Admin
                            <label>Manager ID</label>
                            <Field type="text" name="managerId"></Field>
                            
                            <button type="submit" disabled={isSubmitting}>Submit</button>
                            <ErrorMessage name='firstName' className='field-validation' component ='div'/>
                            <ErrorMessage name='lastName' className='field-validation' component='div'/>
                            <ErrorMessage name='email' className='field-validation' component='div'/>
                            <ErrorMessage name='password' className='field-validation' component='div'/>
                            <ErrorMessage name='role' className='field-validation' component='div'/>
                            <ErrorMessage name='managerId' className='field-validation' component='div'/>
                            <ErrorMessage name='db' className='field-validation' component='div'/>
                            <div>error {status && (<p>{status.success}</p>) && <p>{message}</p>}</div>
                    
                  
                        </FormWrap>
                    </Form>
                )}

            </Formik>
        </Wrap>
    )
}

export default CreateAccount;