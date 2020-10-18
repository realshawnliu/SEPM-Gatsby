import { gql, useQuery, useMutation } from "@apollo/client"
import React from "react"
import styled from "styled-components"

//styling
const InfoWrap = styled.div`
  background: transparent;
  width: 100%;
  margin-bottom: 1em;
`

const LEAVE_BALANCE = gql`
{
  leave_balance {
    annual
    carer
    parental
    sick_with_certi
    sick_without_certi
    user_id
  }
}
`

export default function ShowHistory({ userData }) {
  const userID = userData.user_id

  const { loading, error, data } = useQuery(LEAVE_BALANCE)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`
  // if (data) console.log(data)

  // console.log(data.leave_balance)

  let findID = false
  let location = -1

  for (let i = 0; i < data.leave_balance.length; i++) {
    // console.log("this user: " + userID)
    // console.log(data.leave_balance[i].user_id)
    if (userID === data.leave_balance[i].user_id) {
      findID = true
    }
  }

  if(findID === false){
    return(
          <InfoWrap>
    <p>did not find userID in leave balance</p>
  </InfoWrap>
    )
  }

    return (
      <>
        {data.leave_balance.map(req => {
          const annual = req.annual
          const parental = req.parental
          const sickWithCert = req.sick_with_certi
          const sickWithoutCert = req.sick_without_certi
          const carer = req.carer
          const balanceID = req.user_id

          if (balanceID === userID) {
            return (
              <>
                <InfoWrap key={userID}>
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
          }
        })}
      </>
    )

}
