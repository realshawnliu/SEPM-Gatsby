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

const manager_user_id = "\"068dfbe3-e725-4ab2-aac9-307dd6659b22\"";
const EMPLOYEES_LIST = gql`
{
  user(where: {manager_id: {_eq: ${manager_user_id}}}){
    first_name
    last_name
    email
  }
}
`;


export default function ShowHistory() {
  const { loading, error, data } = useQuery(EMPLOYEES_LIST)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`

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
