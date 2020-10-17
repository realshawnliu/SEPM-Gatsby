import { gql, useQuery, useMutation } from "@apollo/client"
import React from "react"
import styled from "styled-components"

//styling
const InfoWrap = styled.div`
  background: transparent;
  width: 100%;
  margin-bottom: 1em;
  border: white solid 1px;
  border-radius: 5px;
  padding: 5px;
`

var leave_balance_user_id = '"d0bc7c2d-a54e-4d9b-8d7f-0a982086de6a"'

const LEAVE_BALANCE = gql`
{
  leave_balance(where: {user_id: {_eq: ${leave_balance_user_id}}}) {
    annual
    parental
    sick_with_certi
    sick_without_certi
    carer
  }
}
`

export default function ShowHistory() {
  const { loading, error, data } = useQuery(LEAVE_BALANCE)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`
  //   if (data) console.log(data)

  //   const obj = data.user[0]
  //   console.log(obj)

  // const leaveID = obj.leave_id
  // console.log(leaveID)

  // const fromDate = data.leave_request.map(req => req.from)
  // console.log(fromDate)

  return (
    <>
      {data.leave_balance.map(req => {
        const annual = req.annual
        const parental = req.parental
        const sickWithCert = req.sick_with_certi
        const sickWithoutCert = req.sick_without_certi
        const carer = req.carer

        // console.log(annual)
        // console.log(last)
        // console.log(isActive)
        // console.log("role: " + role)

        return (
          <>
            <InfoWrap key={leave_balance_user_id}>
              <p>
                <b>annual:</b> {annual}
              </p>

              <p>
                <b>parental:</b> {parental}
              </p>

              <p>
                <b>sick With Certificate:</b> {sickWithCert}
              </p>

              <p>
                <b>sick Without Certificate:</b> {sickWithoutCert}
              </p>

              <p>
                <b>carer:</b> {carer}
              </p>
            </InfoWrap>
          </>
        )
      })}
    </>
  )
}
