import { gql, useQuery, useMutation } from "@apollo/client"
import React, { Component } from "react"
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

const CANCEL_LEAVE_REQUEST = gql`
  mutation($leave_id: uuid!) {
    CancelLeaveRequest(leave_id: $leave_id) {
      affected_rows
    }
  }
`

const LEAVE_HISTORY = gql`{
    leave_request {
      user_id
      to
      status
      requested_on
      no_of_days
      leave_type_id
      leave_id
      from
      leave_type {
        name
      }
    }
}
`

export default function ShowHistoryBlock({ userData }) {
  const userID = userData.user_id

  const [cancelRequest] = useMutation(CANCEL_LEAVE_REQUEST)

  const { loading, error, data } = useQuery(LEAVE_HISTORY)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`
  if (data) console.log(data)

  let hasRequest = false;

  for (let i = 0; i < data.leave_request.length; i++) {
    if (userID === data.leave_request[i].user_id) {
      hasRequest = true
    }
  }

  if (hasRequest === false) {
    return (
      <InfoWrap>
        <p>no request history</p>
      </InfoWrap>
    )
  }

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
        const requestUserID = req.user_id

        if (requestUserID === userID) {
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

                {status === "PENDING" ? (
                  <BtnBox>
                    <CancelBtn
                      onClick={e => {
                        e.preventDefault()
                        cancelRequest({
                          variables: {
                            leave_id: userID,
                          },
                        })
                          .then(data => {
                            console.log(
                              "leave id " +
                              userID +
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
        }
      })}
    </>
  )
}
