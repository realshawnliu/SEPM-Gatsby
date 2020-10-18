import { gql, useQuery, useMutation } from "@apollo/client"
import React from "react"
import styled from "styled-components"

//styling
const InfoWrap = styled.div`
  background: transparent;
  width: 80%;
  margin-bottom: 1em;
  display:flex;
  flex-direction: column;
  border-raidus: 5px;
  border: 1px solid rgba(254, 254, 254,.3);
  padding: 10px;
`
const ApproveBtn = styled.button`
  background: transparent;
  border: solid white 1px;
  border-radius: 4px;
  color: white;
  margin: 1em;
  transition: 0.3s;

  &:hover{
    background: rgba(168,218,168, 0.6);

  }
`
const RejectBtn = styled.button`
  background: transparent;
  border: solid white 1px;
  border-radius: 4px;
  color: red;
  margin: 1em;
  transition: 0.3s;

  &:hover{
    background: rgba(235,60,60, 0.6);
    color: white;

}
`

const BtnBox = styled.div`
  display: flex;
`
const DateBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: space-around;
`


const EMPLOYEES_LEAVE_REQUEST = gql`
{
  leave_request {
    user {
      manager_id
      first_name
      last_name
    }
    from
    to
    status
    requested_on
    no_of_days
    leave_type {
      name
    }
    leave_id
  }
}
`

const APPROVE_LEAVE_REQUEST = gql`
  mutation($leave_id: uuid!) {
    ApproveLeaveRequest(leave_id: $leave_id) {
      affected_rows
    }
  }
`
const REJECT_LEAVE_REQUEST = gql`
  mutation($leave_id: uuid!) {
    RejectLeaveRequest(leave_id: $leave_id) {
      affected_rows
    }
  }
`


export default function ShowRequests({ userData }) {
  const userID = userData.user_id

  const [approveRequest] = useMutation(APPROVE_LEAVE_REQUEST)
  const [rejectRequest] = useMutation(REJECT_LEAVE_REQUEST)

  const { loading, error, data } = useQuery(EMPLOYEES_LEAVE_REQUEST)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`
  // if (data) console.log(data)


  let hasRequest = false;

  for (let i = 0; i < data.leave_request.length; i++) {

    if (userID === data.leave_request[i].user.manager_id) {
      hasRequest = true

      console.log(data.leave_request[i].user.manager_id)
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
        const firstName = req.user.first_name
        const lastName = req.user.last_name
        const leaveID = req.leave_id
        const staffManagerID = req.user.manager_id


        if (staffManagerID === userID) {
          return (
            <>
              <InfoWrap key={leaveID}>
                <p>
                  Name : {firstName} {lastName}
                </p>
                <DateBox>
                  <div><p><b>From: </b> {fromDate}</p></div>
                  <div><p><b>To: </b> {toDate}{" "}</p></div>
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
                    <ApproveBtn
                      onClick={e => {
                        e.preventDefault()
                        approveRequest({
                          variables: {
                            leave_id: leaveID,
                          },
                        })
                          .then(data => {
                            console.log("leave id" + leaveID + "request approved")
                          })
                          .catch(e => {
                            console.log(e)
                          })
                      }}
                    >
                      {" "}
                    Approve
                  </ApproveBtn>

                    <RejectBtn
                      onClick={e => {
                        e.preventDefault()
                        rejectRequest({
                          variables: {
                            leave_id: leaveID,
                          },
                        })
                          .then(data => {
                            console.log(
                              "leave id " + leaveID + "request rejected"
                            )
                          })
                          .catch(e => {
                            console.log(e)
                          })
                      }}
                    >
                      {" "}
                    Reject
                  </RejectBtn>
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
