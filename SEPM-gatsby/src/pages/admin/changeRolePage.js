import { gql, useQuery, useMutation } from "@apollo/client"
import React, {useState} from "react"
import{ Link, navigate} from "gatsby"
import styled from "styled-components"
import style from "../admin/showUser.module.css"
import Layout from "../../components/admin-layout"
import { Formik, Form, Field, errors, ErrorMessage } from 'formik';

const MainWrap = styled.div`
    display:flex;
    flex-direction: column;
`
const Wrap=styled.div`
    display:flex;
    flex-direction: row;
`

const UPDATE_ROLE = gql`
mutation($user_id: uuid!, $role_admin: Boolean!, $role_manager: Boolean!, $manager_id: uuid) {
  UpdateRole(user_id: $user_id, role_admin: $role_admin, role_manager: $role_manager, manager_id: $manager_id) {
    affected_rows
  }
}
`

export default ({location}) => {
    let sent = false;
    const userid = location.state.user
    var newUser = "\""+userid+"\""

    const QUERY = gql`
    {
        user(where: {user_id: {_eq:${newUser}}}){
            manager_id
            role_admin
            role_manager
            first_name 
            last_name
        }
    }`
    const [updateRole] = useMutation(UPDATE_ROLE);
    const{loading,error,data} = useQuery(QUERY)
    if (loading) return "loading..."
    if (error) return `Error! ${error.message}`
    if (data) console.log(data)

    const managerid = data.user[0].manager_id
    console.log(managerid)

    return(
        <Wrap>
      
            <Layout></Layout>
                
            <h1>Change role for {data.user[0].first_name}</h1>

            <Formik
                initialValues={{
                    manager: data.user[0].role_manager === false? ``: `checked`,
                    admin: data.user[0].role_admin === false? ``: `checked`,
                    manager_Num: data.user[0].managerid === null? null: data.user[0].managerid
                }}

                onSubmit={ async (values)=>{

                    await new Promise ((r) => setTimeout(r,200));
                    let output={};
                    try{
                        await updateRole({
                            variables: {
                                user_id: userid,
                                role_admin: values.admin === ``? false: true,
                                role_manager: values.manager === ``? false: true,
                                manager_id: null
                            }
                        }).then((data)=> { sent = true;})
                    }
                    catch(err){
                        output.message = err.graphQLErrors[0].message
                        console.log(output.message)
                    }
                    
                    if(sent === true){
                        output.message=`User's role has been changed`
                        output.type=`success`
                        output.classes=style.success
                        navigate('/admin/admin-home');
                    }
                }}
            >

                {({isSubmitting, status}) => (
                    <Form>
                        <MainWrap>
                            <label>Manager</label>
                            <Field type="checkbox" name="manager" ></Field>

                            <label>Admin</label>
                            <Field type="checkbox" name="admin" ></Field>

                            <label>Staff</label>
                            <Field type="checkbox" name="staff" ></Field>

                            <label>Please provide manager id, if the role is only staff</label>
                            <label>Manager id</label>
                            <Field type="text" name="manager_Num"></Field>

                            <button type="submit" disabled={isSubmitting}>submit</button>
                            {status && <div className={status.classes}>{status.message}</div>}
                        </MainWrap>
                    </Form>
                )}
            </Formik>
   
     </Wrap>
    )
    
}