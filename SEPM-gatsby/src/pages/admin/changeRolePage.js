import { gql, useQuery, useMutation } from "@apollo/client"
import React, {useState} from "react"
import{ Link, navigate} from "gatsby"
import styled from "styled-components"
import style from "../admin/showUser.module.css"
import Layout from "../../components/admin-layout"
import { Formik, Form, Field, errors, ErrorMessage} from 'formik';
import ManagerDropDown from "../admin/mangerDropDown";

const MainWrap = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    padding: 3em;
`
const Wrap=styled.div`
    display:flex;
    flex-direction: row;
   
`
const TextWrap = styled.div`
    
`
const Title =styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
`

//queries

const UPDATE_ROLE = gql`
mutation($user_id: uuid!, $role_admin: Boolean!, $role_manager: Boolean!, $manager_id: uuid) {
  UpdateRole(user_id: $user_id, role_admin: $role_admin, role_manager: $role_manager, manager_id: $manager_id) {
    affected_rows
  }
}
`
const LIST_MANAGER = gql`{
    user(where: {role_manager: {_eq: true}}) {
      user_id
      first_name
      last_name
    }
}
`;


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
    const{loadingManager, errorManager, dataManager} = useQuery(LIST_MANAGER);
    if (loadingManager) return "loading..."
    if (errorManager) return `Error! ${error.message}`
    if (dataManager) console.log(data)

    const{loading,error,data} = useQuery(QUERY)
    if (loading) return `loading..`
    if (error) return `Error! ${error.message}`
    if (data) console.log(data)

    const managerid = data.user[0].manager_id
    console.log(dataManager)
    

    return(
        <Wrap>
      
            <Layout></Layout>
            
                
            <Formik
                enableReinitialize
                initialValues={{
                    manager: ``,
                    admin: ``,
                    staff: `checked`,
                    manager_Num: ``
                }}

                validate={(values) => {
                    let error={}
                    if(values.manager === `` && values.manager_Num === `` && values.admin === ``){
                        error.managerid = `Need to select a manager id , if it is a normal staff account`
                    }
                }}



                //\""+values.manager_Num+"\"
                onSubmit={ async (values,actions)=>{
                    
                    var man_id = values.managerId
                    console.log(man_id);
                    await new Promise ((r) => setTimeout(r,200));
                    let output={};
                    try{
                        await updateRole({
                            variables: {
                                user_id: userid,
                                role_admin: values.admin === ``? false: true,
                                role_manager: values.manager === ``? false: true,
                                manager_id: values.managerId === ``? null: man_id
                            }
                        }).then((data)=> { sent = true;})
                    }
                    catch(err){
                        output.message = err.graphQLErrors[0].message
                        console.log(output.message)
                        output.classes= style.fail
                    }
                    
                    if(sent === true){
                        output.message=`User's role has been changed`
                        output.type=`success`
                        output.classes=style.success
                        navigate('/admin/admin-home');
                    }
                    actions.setStatus(output)
                    actions.setSubmitting(true)

                    console.log(`"${values.managerId}"`)
                }}
            >

                {({isSubmitting, status, handleChange, values, props}) => (
                    <Form>
                        <MainWrap>
                        <TextWrap>
                            <Title><h1>Change role for </h1><h1>{data.user[0].first_name}</h1></Title>
                            <h3>current role: 
                                <p> {data.user[0].role_manager === false? ``: `manager`} </p>
                                <p>{data.user[0].role_admin === false? ``: `admin`} </p>
                                <p>{data.user[0].role_admin === false && data.user[0].role_mananger === false? `normal staff`: ``}</p>
                            
                            </h3>
                        </TextWrap>
                            <label>Manager</label>
                            <Field type="checkbox" name="manager" ></Field>

                            <label>Admin</label>
                            <Field type="checkbox" name="admin"></Field>

                            <label>Normal staff</label>
                            <Field type="checkbox" name="staff"></Field>

                            <label>Please choose manager id, if the role is only staff</label>
                            <label>Manager ID</label>
                            
                            <Field
                                as="select"
                                name="managerId"
                                component="select"
                                value={values.managerId}
                                onChange={handleChange}
                            >
                                <ManagerDropDown/>
                            </Field>
                           

                            <button type="submit" disabled={isSubmitting}>submit</button>
                        
                            {status && <div className={status.classes}>{status.message}</div>}
                        </MainWrap>
                    </Form>
                )}
            </Formik>
   
     </Wrap>
    )
    
}