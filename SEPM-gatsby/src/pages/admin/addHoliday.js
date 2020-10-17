import React from "react"
import style from "styled-components"
import {
    gql, useMutation,
    useQuery
} from '@apollo/client';
import { Formik, Form, Field, errors, ErrorMessage } from 'formik';
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";


const Error = style.h2`
  color: red;
`

const Confirmation = style.h1`
    color: green;
`

const InfoWrap = style.div`
  background: #cfb7db;
  width: 100%;
  margin-bottom: 1em;
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

const ADD_PUBLIC_HOLIDAY = gql`
mutation($name: String!, $date: date!) {
  AddPublicHoliday(name: $name, date: $date) {
    affected_rows
  }
}
`;

const GET_Holiday = gql`
 {
    public_holiday {
        date
        Name
      }
}
`;


const AddHoliday = () => {
    const [startDate, setStartDate] = useState(new Date());

    const [addHoliday] = useMutation(ADD_PUBLIC_HOLIDAY)

    const updateHoliday = (name, date) => {
        addHoliday({
            variables: {
                name: name,
                date: date,
            }
        })
    }

    const { loading, error, data } = useQuery(GET_Holiday)
    if (loading) return "loading..."
    if (error) return `Error! ${error.message}`
    // if (data) console.log(data)

    return (
        <div>
            <Main>
                <h1>Change Leaves Limit Page</h1>
                <Formik
                    initialValues={{
                        name: '',
                        date: '',

                    }}
                    onSubmit={async (values, actions) => {
                        await new Promise((r) => setTimeout(r, 500));

                        try {
                            const response = await updateHoliday(values.name, startDate)
                        }
                        catch (err) {
                            console.log(err)
                        }

                    }}
                >
                    {({ isSubmitting, status, handleChange, handleBlur, values }) => (
                        <Form>
                            <FormWrap>
                                <label>Enter the name of holiday:</label>
                                <Field name="name"></Field>

                                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />

                                <button type="submit" disabled={isSubmitting}>Add</button>
                                {status && <div className={status.classes}>{status.message}</div>}
                            </FormWrap>
                        </Form>
                    )}
                </Formik>
            </Main>

            <>
                {data.public_holiday.map(req => {
                    const name = req.Name
                    const date = req.date

                    return (
                        <>
                            <InfoWrap key='1'>
                                <p>
                                    <b>Name:</b> {name}
                                </p>
                                <p>
                                    {" "}
                                    <b>Date:</b> {date}
                                </p>
                            </InfoWrap>
                        </>
                    )
                })}
            </>
        </div>
    )
}


export default AddHoliday