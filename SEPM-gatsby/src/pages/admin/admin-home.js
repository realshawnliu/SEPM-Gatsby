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

const BtnBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
`


export default function AdminHome() {
  // console.log(window.userData)

  return (
    <BigWrap>
      <Layout/>
      <MainWrap>
        <h1>ADMIN HOME PAGE</h1>  
        <BtnBox>
          <div>
            {window.userData.role_admin ?
              <Link className= {style.switchBtn} to={`/staff/staff-home/`}>switch to staff </Link> : ''
            }
          </div>
          <div>
            {window.userData.role_manager ?
              <Link className ={style.switchBtn} to={`/manager/manager-home/`} >switch to manager </Link> : ''
            }
          </div>
          </BtnBox>

        <ShowUser/>
      </ MainWrap>
    </ BigWrap>
  )
}