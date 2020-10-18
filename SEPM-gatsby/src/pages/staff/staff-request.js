import React, { useState } from "react"
import Layout from "../../components/staff-layout"
import { Col, Button, ButtonGroup } from "react-bootstrap"
import styled from "styled-components"
import { gql, useMutation } from "@apollo/client"
import style from "../admin/createAccount.module.css";
import { Formik, Form, Field, errors, ErrorMessage } from 'formik';
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker';


//styling
const FormWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: center;
    padding: 3em;
`

const BtnGroup = styled.div`
  display: flex;
  flex-direction: column;

`

//query
const LEAVE_REQUEST = gql`
  mutation(
    $user_id: uuid!
    $from: date!
    $to: date!
    $leave_type_id: uuid!
    $no_of_days: Int!
    $requested_on: date!
    $status: String!
  ) {
    AddLeaveRequest(
      user_id: $user_id
      from: $from
      to: $to
      leave_type_id: $leave_type_id
      no_of_days: $no_of_days
      requested_on: $requested_on
      status: $status
    ) {
      affected_rows
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const StaffRequest2 = () => {
  let sent = false;
  const userID = window.userData.user_id;
  const [addLeaveRequest] = useMutation(LEAVE_REQUEST)
  const [leaveStartDate, setLeaveStartDate] = useState(new Date());
  const [leaveEndDate, setLeaveEndDate] = useState(new Date());
  const [radioValue, setRadioValue] = useState("1")

  // shouldnt need to hard code the value but will change later on , when i can send data
  const radios = [
    { name: "annual leave", value: "08a1ac22-1b41-47fd-8086-1d901eff6383" },
    { name: "carer's leave", value: "75e4f1e4-5f71-4ab2-9d78-ddac68bcffbf" },
    {
      name: "sick leave with certificate",
      value: "452eed0f-fe7a-4985-a474-00c692fa7e14",
    },
    {
      name: "sick leave without certificate",
      value: "b586a842-2059-4060-95dc-d2227cdd1c57",
    },
    { name: "parental leave", value: "6c95ef3d-35e8-4cef-bfce-3dccedc4d908" },
    { name: "unpaid leave", value: "9b157769-98e3-4f6b-b587-07773303b273" },
    { name: "blood_donor", value: "2e58c789-b8b8-41ce-9d01-0a6d54cc7d39" },
  ]

  const inputDates = (startDate, endDate) => {


  }

  return (
    <div className="mb-2">
      <Wrapper>
        <Layout />
     
        <FormWrap>
          <Formik
            initialValues={{
              typeOfLeave:``

            }}

            // validate={(values) => {
            //   let errors= {}

            //   if(!values.leaveStartDate){
            //       errors.leaveStartDate=`Leave start date cannot be empty`
            //   }
            //   else if(!values.leaveEndDate){
            //       errors.leaveEndDate = `Leave End date cannot be empty`
            //   }
            //   else if(!values.typeOfLeave){
            //       errors.typeOfLeave = `Please choose a leave type`
            //   }
            //   return errors 
            // }}

            onSubmit={ async (values, actions,e) => {
             
              console.log("click")
              console.log(userID);

              var correctFormatID = userID
              let output={};

              console.log(leaveStartDate);
              console.log(leaveEndDate);
              console.log(values.typeOfLeave);

              try{
                await addLeaveRequest({
                  variables: {
                    user_id: correctFormatID,
                    from: leaveStartDate,
                    to: leaveEndDate,
                    leave_type_id: values.typeOfLeave,
                    no_of_days: 0,
                    requested_on: "",
                    status: "",
                  },
                })
                  .then(data => {
                    console.log("request has been submitted")
                    sent = true;
                  })
              }
              catch(err){
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

            {({ isSubmitting, status, handleChange, handleBlur, values }) => (

              <Form>
                <h1>Enter the Details of leave</h1>
            
                  <label><b>Leave Start</b></label>
                 
                  <DatePicker className={style.input} selected={leaveStartDate} name="leaveStartDate" onChange={date=> setLeaveStartDate(date)}/>
                  
            
                  <label><b>Leave End</b></label>

                  <DatePicker className={style.input}  selected={leaveEndDate} name="leaveEndDate" onChange={date => setLeaveEndDate(date)}/>
                  
                  
                  <label><b>Leave Type</b></label>

                  <Field
                    as="select"
                    name="typeOfLeave" 
                    component="select"
                    values={values.typeOfLeave}
                    onChange={handleChange}
                >
                    <option value="" label="select leave type"/>    
                    {radios.map((ele) => {
                        return(
                            <option key={ele.unqiueId} value={ele.value} label={ele.name}/>
                        )
                    })}
                  </Field>

                    {/* {radios.map(radio => (
                      <ButtonGroup toggle className="mb-3">
                       
                          <Field
                            className={style.input}
                            type="radio"
                            key={radio.uniqueId}
                            name="tyepOfLeave"
                            value={radio.value}
                            // checked={radioValue === radio.value}
                            onChange={handleChange}
                          ></Field>
                          {radio.name}
                        
                      </ButtonGroup>
                    ))} */}

                     <button className={style.submitBtn} type="submit" disabled={isSubmitting}>
                       Submit
                    </button>

                  <ErrorMessage name='leaveStartDate' className={style.fail} component='div'/>        
                  <ErrorMessage name='leaveEndDate' className={style.fail} component='div'/>
              
                    { isSubmitting? <div>loading....</div>: ``}
                    {status && <div className={status.classes}>{status.message}</div>}
                 
              </Form>
            )}
          </Formik>
          
        </FormWrap>
      </Wrapper>
    </div>
  )
}

export default StaffRequest2