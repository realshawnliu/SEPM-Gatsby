import React from "react"
// import { css } from "@emotion/core"
// import { Link } from "gatsby"
import Layout from "../../components/admin-layout"
import ShowUser from "../admin/showUser"
import styled from "styled-components"

const BigWrap =styled.div`
display:flex;
flex-direciton:row;
`
const MainWrap = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding 3em;
`


export default function AdminHome() {
  return (
    <BigWrap>
      <Layout/>
      <MainWrap>
        <h1>ADMIN HOME</h1>   
        <nav>
          <p>see the list of all users</p>
          <p>deactivate account</p>
          <p>change the roles of users</p>
        </nav>
        <ShowUser/>
      </MainWrap>
    </BigWrap>
  )
}
