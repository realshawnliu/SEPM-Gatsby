import React from "react"
import Layout from "../../components/staff-layout"
import ShowBalance from "../staff/showBalance"
import StaffNoti from "../staff/staffNoti"
import { Link } from "gatsby"
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
const BtnBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
`

export default function StaffHome() {

  // console.log(window.userData)

  return (
    <Main>
      <Layout/>
      <Wrap>
        <h1>Welcome {window.userData.first_name}</h1>
          <BtnBox>
          
          <div>
            {window.userData.role_admin ?
              <Link className= {style.switchBtn} to={`/admin/admin-home/`}>switch to admin </Link> : ''
            }
          </div>
          <div>
            {window.userData.role_manager ?
              <Link className ={style.switchBtn} to={`/manager/manager-home/`} >switch to manager </Link> : ''
            }
          </div>

          </BtnBox>
            

          {/* <StaffNoti /> */}


        <ShowBalance userData={window.userData}/>

      </Wrap>
       
    </Main>
      
  )
}