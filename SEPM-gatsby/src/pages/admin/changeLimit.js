import React from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
// import { Form, Col, Button } from "react-bootstrap"
import styled from "styled-components"
import {
    gql, useMutation,
    useQuery
} from '@apollo/client';
// import PropTypes from 'prop-types';
import { Formik, Form, Field, errors, ErrorMessage } from 'formik';
import style from "../admin/createAccount.module.css";

const Error = styled.h2`
  color: red;
`

const Confirmation = styled.h1`
    color: green;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3em;
`

const FormWrap = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
`

const UPDATE_LIMIT = gql`
mutation($leave_type_id: uuid!, $limit: Int!) {
  UpdateLimit(leave_type_id: $leave_type_id, limit:$limit) {
    affected_rows
  }
}
`;

const GET_LIMIT = gql`
 {
    leave_type {
    name
    limit
    }
}
`;

let loginCheck = false;

const ChangeLimitPage = () => {
    let carerLimit = 0
    let parentalLimit = 0
    let sickWithCLimit = 0
    let sickWithoutCLimit = 0
    let bloodLimit = 0
    let unpaidLimit = 0
    let annualLimit = 0

    // function refreshPage(){
    //     window.location.reload();
    // }

    const [updateLimit] = useMutation(UPDATE_LIMIT)

    const updateHandler = (carer, parental, sickWithCert,
        sickWithoutCert, blood, unpaid, annual) => {

        updateLimit({
            variables: {
                leave_type_id: "75e4f1e4-5f71-4ab2-9d78-ddac68bcffbf",
                limit: carer,
            }
        })
        updateLimit({
            variables: {
                leave_type_id: "6c95ef3d-35e8-4cef-bfce-3dccedc4d908",
                limit: parental,
            }
        })
        updateLimit({
            variables: {
                leave_type_id: "452eed0f-fe7a-4985-a474-00c692fa7e14",
                limit: sickWithCert,
            }
        })
        updateLimit({
            variables: {
                leave_type_id: "b586a842-2059-4060-95dc-d2227cdd1c57",
                limit: sickWithoutCert,
            }
        })
        updateLimit({
            variables: {
                leave_type_id: "2e58c789-b8b8-41ce-9d01-0a6d54cc7d39",
                limit: blood,
            }
        })
        updateLimit({
            variables: {
                leave_type_id: "9b157769-98e3-4f6b-b587-07773303b273",
                limit: unpaid,
            }
        })
        updateLimit({
            variables: {
                leave_type_id: "08a1ac22-1b41-47fd-8086-1d901eff6383",
                limit: annual,
            }
        })
    }

    const { loading, error, data } = useQuery(GET_LIMIT)
    if (loading) return "loading..."
    if (error) return `Error! ${error.message}`
    // if (data) console.log(data)


    for (let i = 0; i < data.leave_type.length; i++) {
        if (data.leave_type[i].name === "carer") {
            carerLimit = data.leave_type[i].limit
        }
        if (data.leave_type[i].name === "parental") {
            parentalLimit = data.leave_type[i].limit
        }
        if (data.leave_type[i].name === "sick_with_certi") {
            sickWithCLimit = data.leave_type[i].limit
        }
        if (data.leave_type[i].name === "sick_without_certi") {
            sickWithoutCLimit = data.leave_type[i].limit
        }
        if (data.leave_type[i].name === "blood_donor") {
            bloodLimit = data.leave_type[i].limit
        }
        if (data.leave_type[i].name === "unpaid") {
            unpaidLimit = data.leave_type[i].limit
        }
        if (data.leave_type[i].name === "annual") {
            annualLimit = data.leave_type[i].limit
        }
    }

    return (
        <Main>
            <h1>Change Leaves Limit Page</h1>
            <Formik
                initialValues={{
                    newCarer: carerLimit,
                    newParental: parentalLimit,
                    newSickWithCert: sickWithCLimit,
                    newSickWithoutCert: sickWithoutCLimit,
                    newBlood: bloodLimit,
                    newUnpaid: unpaidLimit,
                    newAnnual: annualLimit,
                }}

                validate ={( values, actions) => {
                    let errors={}

                    if(!values.newCarer){
                        errors.newCarer =`new carer limit cannot be empty `
                    }
                    else if (!values.newParental){
                        errors.newParental =` new parental limit cannot be empty`
                    }
                    else if(!values.newSickWithCert){
                        errors.newSickWithCert = `sick with cert limit cannot be empty`
                    }
                    else if (!values.newSickWithoutCert){
                        errors.newSickWithoutCert = `sick without cert limit cannot be empty`
                    }
                    else if (!values.newBlood){
                        errors.newBlood = ` Blood donor limit cannot be empty`
                    }
                    else if (!values.newUnpaid){
                        errors.newUnpaid = `unpaid limit cannot be empty `
                    }
                    else if (!values.newAnnual){
                        errors.newAnnual = ` anuual limit cannot be empty`
                    }

                    return errors
                }}

                onSubmit={async (values, actions) => {
                    await new Promise((r) => setTimeout(r, 500));

                    try {
                        const response = await updateHandler(values.newCarer, values.newParental, values.newSickWithCert,
                            values.newSickWithoutCert, values.newBlood, values.newUnpaid, values.newAnnual)
                    }
                    catch (err) {
                        console.log(err)
                    }

                    if (loginCheck === true) {
                        let message = {}
                        message.email = `login successfully`
                    }
                }}
            >
                {({ isSubmitting, status, handleChange, handleBlur, values }) => (
                    <Form>
                        <FormWrap>
                            <label>carer leaves:</label>
                            <Field className={style.input} name="newCarer"></Field>
                            <ErrorMessage name='newCarer' className={style.fail} component='div'/>


                            <label>parental leaves:</label>
                            <Field className={style.input} name="newParental"></Field>
                            <ErrorMessage name="newParental" className={style.fail} component='div'/>


                            <label>sick leaves with certificate:</label>
                            <Field className={style.input} name="newSickWithCert"></Field>
                            <ErrorMessage name="newSickWithCert" className={style.fail} component='div'/>

                        
                            <label>sick leaves without certificate:</label>
                            <Field className={style.input} name="newSickWithoutCert"></Field>
                            <ErrorMessage name="newSickWithoutCert" className={style.fail} component='div'/>

                            <label>blood donor leaves:</label>
                            <Field className={style.input} name="newBlood"></Field>
                            <ErrorMessage name="newBlood" className={style.fail} component='div'/>

                            <label>unpaid leaves:</label>
                            <Field className={style.input} name="newUnpaid"></Field>
                            <ErrorMessage name="newUnpaid" className={style.fail} component='div'/>

                            <label>annual leaves:</label>
                            <Field className={style.input} name="newAnnual"></Field>
                            <ErrorMessage name="newAnnual" className={style.fail} component='div'/>

                            <button type="submit" disabled={isSubmitting}>Update</button>
                            {status && <div className={status.classes}>{status.message}</div>}
                        </FormWrap>
                    </Form>
                )}
            </Formik>
        </Main>
    )
}


export default ChangeLimitPage