import { gql, useQuery, useMutation } from "@apollo/client"
import React from "react"
import styled from "styled-components"

//styling
const InfoWrap = styled.div`
  background: transparent;
  width: 100%;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  margin: 20px;
`

const NameEmail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const EMPLOYEES_LIST = gql`
{
  user {
    manager_id
    last_name
    first_name
    email
  }
}
`;


export default function ShowStaff({ userData }) {
  const userID = userData.user_id

  const { loading, error, data } = useQuery(EMPLOYEES_LIST)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`
  if (data) console.log(data)

  let hasStaff = false;

  for (let i = 0; i < data.user.length; i++) {
    console.log("managerID:      " + userID)
    console.log("staffManagerID: " + data.user[i].manager_id)
    console.log(" ")

    if (userID === data.user[i].manager_id) {
      hasStaff = true
    }
  }

  if (hasStaff === false) {
    return (
      <InfoWrap>
        <p>no staff</p>
      </InfoWrap>
    )
  }

  return (
    <>
      {data.user.map(req => {
        const firstName = req.first_name
        const lastName = req.last_name
        const email = req.email
        const staffManagerID = req.manager_id

        if (staffManagerID === userID) {
          return (
            <>
              <InfoWrap>
                <h1> Staff List : </h1>
                <NameEmail>
                  <div><p>Name : {firstName} {lastName}</p></div>
                  <div><p><b>Email:</b> {email}</p></div>
                </NameEmail>
              </InfoWrap>
            </>
          )

        }
        // return (
        //   <>
        //     <InfoWrap>
        //       <h1> Staff List : </h1>
        //       <NameEmail>
        //         <div><p>Name : {firstName} {lastName}</p></div>
        //         <div><p><b>Email:</b> {email}</p></div>
        //       </NameEmail>
        //     </InfoWrap>
        //   </>
        // )
        // return (
        //   <>
        //     <InfoWrap>
        //       <h4>
        //         Name : {firstName} {lastName}
        //       </h4>

        //       <p>
        //         <b>Email:</b> {email}
        //       </p>
        //     </InfoWrap>
        //   </>
        // )
      })}
    </>
  )
}
