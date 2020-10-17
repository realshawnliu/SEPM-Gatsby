import { gql, useQuery, useMutation } from "@apollo/client"
import React from "react"
import styled from "styled-components"

//styling
const InfoWrap = styled.div`
  background: #cfb7db;
  width: 100%;
  margin-bottom: 1em;
`
const DeactivateBtn = styled.button`
  background: #f53f87;
  border: none;
  border-radius: 4px;
  color: white;
  margin: 1em;
`

const BtnBox = styled.div`
  display: flex;
`

const EMPLOYEES_LIST = gql`
{
  user{
    first_name
    last_name
    email
    manager_id
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

        return (
          <>
            <InfoWrap>
              <h4>
                Name : {firstName} {lastName}
              </h4>

              <p>
                <b>Email:</b> {email}
              </p>
            </InfoWrap>
          </>
        )
      })}
    </>
  )
}
