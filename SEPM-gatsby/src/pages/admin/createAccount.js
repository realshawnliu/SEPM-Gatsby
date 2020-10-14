import React from 'react';
import { Formik, Form, Field, errors, ErrorMessage } from 'formik';
import { gql, useMutation, useQuery} from '@apollo/client';
import Layout from "../../components/admin-layout"
import styled from "styled-components";
import ManagerDropDrown from "../admin/mangerDropDown";
import ManagerDropDown from '../admin/mangerDropDown';
import style from "../admin/createAccount.module.css";

const NEW_USER = gql`
mutation($first_name: String!, $last_name: String!, $email: String!, $password: String!, $manager_id: uuid, $role_manager: Boolean!, $role_admin: Boolean!) {
  NewUser(first_name: $first_name, last_name: $last_name, email: $email, manager_id: $manager_id, password: $password, role_admin: $role_admin, role_manager: $role_manager) {
    affected_rows
  }
}
`;

const LIST_MANAGER = gql`{
    user(where: {role_manager: {_eq: true}}) {
      user_id
      first_name
      last_name
    }
}
`;

const FormWrap = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
`
const Wrap= styled.div`
    display: flex;
    flex-direction: row;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3em;
`

const ErrorBox = styled.div`
    border: 1px solid red;
    margin-top: 1em;
`
function FormikControl(props) {

}

const CreateAccount = () => {
    const [addAccount] =useMutation(NEW_USER);
    let adminRoleB = false;
    let managerRoleB = false;
    let managerIdValue = null;
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
                <h1>CREATE NEW ACCOUNT</h1>
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
                        else{
                            managerIdValue = values.managerId;
                            console.log(managerIdValue);
                        }
                    }}

                    
                    onSubmit ={ async (values, actions) => {
                        await new Promise ((r) => setTimeout(r,500));
                    
                        let output={};
                    
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

                                <Field
                                    as="select"
                                    name="managerId" 
                                    component="select"
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                >
                                    <option value="" label="select manager id"/>
                                    <option value="abcde" label="abcde"/>
                                    <ManagerDropDown/>
                                </Field>
                                
                                <button type="submit" disabled={isSubmitting}>Submit</button>
                                    <ErrorMessage color='red' name='firstName' className={style.fail} component ='div'/>
                                    <ErrorMessage color='red' name='lastName' className='field-validation' component='div'/>
                                    <ErrorMessage color='red' name='email' className='field-validation' component='div'/>
                                    <ErrorMessage color='red' name='password' className='field-validation' component='div'/>
                                    <ErrorMessage color='red' name='role' className='field-validation' component='div'/>
                                    <ErrorMessage color='red' name='managerId' className={style.fail} component='div'/>
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

export default CreateAccount;