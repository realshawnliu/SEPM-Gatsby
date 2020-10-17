import React from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
import Layout from "../../components/admin-layout"
import ShowUser from "../admin/showUser"
import styled from "styled-components"
import style from "../admin/createAccount.module.css";

const BigWrap =styled.div`
display:flex;
flex-direciton:row;
`
const MainWrap = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  padding 3em;
`


export default function AdminHome() {
  // console.log(window.userData)

  return (
    <BigWrap>
      <Layout/>
      <MainWrap>
        <h1>ADMIN HOME</h1>  
          <h4>
          {window.userData.role_manager ?
            <Link className={style.link} to={`/manager/manager-home/`}>switch to manager </Link> : ''
          }</h4>

        <h4>
          <Link className={style.link} to={`/staff/staff-home/`}>switch to staff </Link>
        </h4>

        <ShowUser/>
      </ MainWrap>
    </ BigWrap>
  )
}