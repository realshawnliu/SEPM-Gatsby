import React from 'react';
import { Formik, Form, Field, errors, ErrorMessage } from 'formik';
import { gql, useMutation, useQuery} from '@apollo/client';
import Layout from "../../components/admin-layout";
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
    background: 
`

const CreateAccount = props => {

    const [addAccount] =useMutation(NEW_USER);
    let adminRoleB = false;
    let managerRoleB = false;
    let managerIdValue = null;
    let sent = false;
    let errorMessageFromDb;
    let message;

    const {loading,error,data} = useQuery(LIST_MANAGER);
    if(loading) return 'loading';
    if(error) {return error.message};


    var pattern = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&+?><)(])[\w$*&+?><)(]{10,}$/;
       
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
                        else if(!pattern.test(values.password)){
                            errors.password = `Passwords should be at least 10 characters, including upper and lower case letters, digits and at least one special character out of !, $ *, &, +, ?, <, >, (, )`
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
                    
                    onSubmit ={ async (values, actions) => {

                        var man_id = values.managerid
                        if(man_id === ``){
                            man_id = null
                        }

                        await new Promise ((r) => setTimeout(r,500));
                    
                        let output={};

                        console.log(man_id);
                        
                        try {
                            const response = await addAccount({
                                variables: {
                                first_name: values.firstName,
                                last_name: values.lastName,
                                email: values.email,
                                manager_id: values.managerid === ``? null : values.managerId,
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
                                <Field className={style.input} type ="text" name="firstName"></Field>
                                <ErrorMessage color='red' name='firstName' className={style.fail} component ='div'/>

                                <label>Last name</label>
                                <Field className={style.input}  type="text" name="lastName"></Field>
                                <ErrorMessage color='red' name='lastName' className={style.fail} component='div'/>

                                <label>Email</label>
                                <Field className={style.input}  type="email" name="email"></Field>
                                <ErrorMessage color='red' name='email' className={style.fail} component='div'/>

                                <label>password</label>
                                <Field className={style.input}  type="password" name="password"></Field>
                                <ErrorMessage color='red' name='password' className={style.fail} component='div'/>

                                <ErrorMessage color='red' name='role' className={style.fail} component='div'/>
                                <label>Account type</label>
                                <Field type="radio" name="role" value="staff"></Field> <label>Normal staff</label>
                                <Field type="radio" name="role" value="manager"></Field> <label>Manager</label>
                                <Field type="radio" name="role" value="admin"></Field> <label>Admin</label>
                                <label>Manager ID</label>

                                <Field
                                    as="select"
                                    name="managerId" 
                                    component="select"
                                    values={values.managerId}
                                    onChange={handleChange}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                >
                                    <option value="" label="select manager id"/>
                                    <option value="abcde" label="abcde"/>
                                    {data.user.map((ele) => {
                                        return(
                                            <option key={ele.user_id} value={ele.user_id} label={ele.user_id}/>
                                        )
                                    })}
                                    
                                </Field>

                                <ErrorMessage color='red' name='managerId' className={style.fail} component='div'/>
                                
                                
                                <button className={style.submitBtn} type="submit" disabled={isSubmitting}>Submit</button>
                                    
                                <ErrorMessage color='red'name='db' className={style.fail} component='div'/>
                                
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