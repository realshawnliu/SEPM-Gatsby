import { gql, useQuery, useMutation } from "@apollo/client"
import React from "react"
import styled from "styled-components"

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

const DateBox = styled.div`
  display: flex;
  flex-direction: space-evenly;
`

var user_id = '"d0bc7c2d-a54e-4d9b-8d7f-0a982086de6a"'

const LEAVE_HISTORY = gql`
{
  leave_request(where: {user_id: {_eq: ${user_id}}}) {
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

const CANCEL_LEAVE_REQUEST = gql`
  mutation($leave_id: uuid!) {
    CancelLeaveRequest(leave_id: $leave_id) {
      affected_rows
    }
  }
`

export default function ShowHistory() {
  const [cancelRequest] = useMutation(CANCEL_LEAVE_REQUEST)

  const { loading, error, data } = useQuery(LEAVE_HISTORY)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`
  // if (data) console.log(data)

  // const obj = data.leave_request[0]
  // console.log(obj)

  // const leaveID = obj.leave_id
  // console.log(leaveID)

  // const fromDate = data.leave_request.map(req => req.from)
  // console.log(fromDate)

  return (
    <>
      {data.leave_request.map(req => {
        const fromDate = req.from
        const toDate = req.to
        const status = req.status
        const requestDate = req.requested_on
        const days = req.no_of_days
        const type = req.leave_type.name
        const leaveID = req.leave_id

        return (
          <>
            <InfoWrap key={leaveID}>
              <DateBox>
                <p>
                  <b>From: </b> {fromDate}
                </p>
                <p>
                  <b>To: </b> {toDate}{" "}
                </p>
              </DateBox>

              <p>
                <b>Status:</b> {status}
              </p>
              <p>
                {" "}
                <b>requested on:</b> {requestDate}
              </p>
              <p>
                <b>no. of days:</b> {days}
              </p>
              <p>
                <b>Leave type:</b> {type}
              </p>

              {status == "PENDING" ? (
                <BtnBox>
                  <CancelBtn
                    onClick={e => {
                      e.preventDefault()
                      cancelRequest({
                        variables: {
                          leave_id: "cc128f90-0255-4f34-bffc-c41d9ccae557",
                        },
                      })
                        .then(data => {
                          console.log(
                            "leave id " +
                              "cc128f90-0255-4f34-bffc-c41d9ccae557" +
                              "request cancelled"
                          )
                        })
                        .catch(e => {
                          console.log(e)
                        })
                    }}
                  >
                    {" "}
                    Cancel
                  </CancelBtn>
                </BtnBox>
              ) : (
                ""
              )}
            </InfoWrap>
          </>
        )
      })}
    </>
  )
}
