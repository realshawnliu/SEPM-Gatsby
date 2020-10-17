import React from "react"
import Layout from "../../components/staff-layout"
import ShowBalance from "../staff/showBalance"
import StaffNoti from "../staff/staffNoti"
import { Link } from "gatsby"
import styled from "styled-components";
import { gql, useMutation, useQuery } from '@apollo/client';
import style from "../admin/createAccount.module.css";



const Wrap = styled.div`
  display:flex;
  padding: 3em;
  flex-direction: column;
  justify-content: center;
  
`

const Main = styled.div`
    display: flex;
    flex-direction: row;
`

export default function StaffHome() {
  const userID = window.userData.user_id
  let needNotify = window.userData.annual_notify
  let output = {}

  if (needNotify === true) {
    console.log("you have not taken any annual within a year")
    output.message = `you have not take any annual within a year`;
    output.classes = style.success
  }


  // console.log(window.userData)

  return (
    <Main>
      <Layout />
      <Wrap>
        <h1>Welcome {window.userData.first_name}</h1>
        <h4>{window.userData.role_admin ?
          <Link to={`/admin/admin-home/`}>switch to admin </Link> : ''
        }</h4>

        <h4>
          {window.userData.role_manager ?
            <Link to={`/manager/manager-home/`} >switch to manager </Link> : ''
          }</h4>
        


        {/* <StaffNoti /> */}

        <ShowBalance userData={window.userData} />
      </Wrap>

    </Main>
  )
}