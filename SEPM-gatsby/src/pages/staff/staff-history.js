import React from "react"
// import { css } from "@emotion/core"
// import { Link } from "gatsby"
import Layout from "../../components/staff-layout"
import ShowHistory from "../staff/showHistory"
import styled from "styled-components";
import style from "../admin/createAccount.module.css";


const Wrap =styled.div`
  display:flex;
  padding: 3em;
  flex-direction: column;
  justify-content: center;
  
`
const Main = styled.div`
    display: flex;
    flex-direction: row;

`


export default function StaffHistory() {
// console.log(window.userData)

  return (
    <Main>
      <Layout/>
      <Wrap>
        <h1>Request history for {window.userData.first_name}</h1>

        <ShowHistory userData={window.userData}/>
      </Wrap>
      
    </Main>
  )
}
