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

const NameEmail =styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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
              <h1> Staff List : </h1>
              <NameEmail>
                <div><p>Name : {firstName} {lastName}</p></div>
                <div><p><b>Email:</b> {email}</p></div>
              </NameEmail>
            </InfoWrap>
          </>
        )
      })}
    </>
  )
}
