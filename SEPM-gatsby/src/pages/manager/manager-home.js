import React, {
  // Component 
} from "react"
import { Link } from "gatsby"
import Layout from "../../components/manager-layout"
import ShowRequests from "../manager/showRequest"
import styled from "styled-components";
import { gql, useMutation, useQuery } from '@apollo/client';
import style from "../admin/createAccount.module.css";

const BtnBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
`
const MainWrap = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  padding 3em;
`

const Wrapper = styled.div`
  display: flex;

`

const RequestWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`
const Nothing = styled.div`
  height: 0.1px;
  width: 0.1 px;
`

const ALL_USER = gql`
{
  user {
        manager_id
        last_name
        first_name
        acct_active
        annual_notify
      }
}
`

const StaffAnnunalBox = styled.div`
  border: 1px solid rgba(254, 254, 254,.3);
  border-radius: 10px;
  width: 30%;
  display: flex;
  flex-direction: column;
  height: 50%;
  padding: 10px;
  margin: 20px;
`

export default function ManagerHome() {
  let output = {}

  const managerID = window.userData.user_id

  const { loading, error, data } = useQuery(ALL_USER)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`
  // if (data) console.log(data)

  const userArray = data.user
  let message =``;


  for (let i = 0; i < userArray.length; i++) {

    if (userArray[i].annual_notify === true
      && userArray[i].manager_id === managerID) {
      console.log(userArray[i].first_name + " " + userArray[i].last_name + " has not taken any annual within a year")
      output.message = `you have not take any annual within a year`;
      output.classes = style.success
    }
  }

  return (
    <div>
      <Wrapper>
        <Layout />
        <MainWrap>
          <h1>MANAGER HOME</h1>
          <BtnBox>
            <div>
              {window.userData.role_admin ?
                <Link className= {style.switchBtn} to={`/admin/admin-home/`}>switch to admin </Link> : ''
              }
            </div>

            <div>
              <Link className= {style.switchBtn} to={`/staff/staff-home/`}>switch to staff </Link>
            </div>
          </BtnBox>

          <RequestWrap>
            <h1>Staff leave request</h1>
            <ShowRequests userData={window.userData} />
          </RequestWrap>

        </MainWrap>
        <StaffAnnunalBox>
          <div><h3>Staff who hasn't taken any annual leave within a year </h3></div>
          {userArray.map((user) => { 
            return(
              <>
                { user.annual_notify === true && user.manager_id === managerID ? 
                <div><p>Name: {user.first_name}{user.last_name}</p></div> : <Nothing></Nothing>
                }
              </>
            )
          })}   
         </StaffAnnunalBox>
        
       
      </Wrapper>
    </div>
  )
}
