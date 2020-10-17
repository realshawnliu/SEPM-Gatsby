import React from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
// import { Form, Col, Button } from "react-bootstrap"
import style from "styled-components"
import {
    gql, useMutation,
    useQuery
} from '@apollo/client';
// import PropTypes from 'prop-types';
import { Formik, Form, Field, errors, ErrorMessage } from 'formik';


const Error = style.h2`
  color: red;
`

const Confirmation = style.h1`
    color: green;
`

const Main = style.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3em;
`

const FormWrap = style.div`
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
                            <Field name="newCarer"></Field>
                            <label>parental leaves:</label>
                            <Field name="newParental"></Field>
                            <label>sick leaves with certificate:</label>
                            <Field name="newSickWithCert"></Field>
                            <label>sick leaves without certificate:</label>
                            <Field name="newSickWithoutCert"></Field>
                            <label>blood donor leaves:</label>
                            <Field name="newBlood"></Field>
                            <label>unpaid leaves:</label>
                            <Field name="newUnpaid"></Field>
                            <label>annual leaves:</label>
                            <Field name="newAnnual"></Field>

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