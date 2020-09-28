import { gql, useQuery, useMutation } from "@apollo/client"
import React from "react"
import styled from "styled-components"
// import { Button } from "react-bootstrap"

//styling
const InfoWrap = styled.div`
  background: #cfb7db;
  width: 100%;
  margin-bottom: 1em;
`
const CancelBtn = styled.button`
  background: #f53f87;
  border: none;
  border-radius: 4px;
  color: white;
  margin: 1em;
`

const BtnBox = styled.div`
  display: flex;
`

var leave_history_user_id = '"068dfbe3-e725-4ab2-aac9-307dd6659b22"'

const CANCEL_LEAVE_REQUEST = gql`
  mutation($leave_id: uuid!) {
    CancelLeaveRequest(leave_id: $leave_id) {
      affected_rows
    }
  }
`

const LEAVE_HISTORY = gql`
{
  leave_request(where: {user_id: {_eq: ${leave_history_user_id}}}) {
    leave_id
    leave_type {
      name
    }
    from
    to
    requested_on
    no_of_days
    status
  }
}
`

export default function ShowHistory() {
  const [CancelRequest] = useMutation(CANCEL_LEAVE_REQUEST)

  const { loading, error, data } = useQuery(LEAVE_HISTORY)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`
  if (data) console.log(data)

  const leaveID = data.leave_request[0]
  console.log(leaveID)

  const leaveType = data.leave_request[1].name
  console.log(leaveType)

  const fromDate = data.leave_request[2].map(req => req.from)
  console.log(fromDate)

  return (
    <>
      {data.user[0].leave_requests.map(req => {
        const fromDate = req.from
        const toDate = req.to
        const status = req.status
        const requestDate = req.requested_on
        const days = req.no_of_days
        const type = req.leave_type.name
        const firstName = req.user.first_name
        const lastName = req.user.last_name
        const leaveID = req.leave_id

        return (
          <>
            
          </>
        )
      })}
    </>
  )
}
