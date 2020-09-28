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
const ApproveBtn = styled.button`
  background: #3fc4f5;
  border: none;
  border-radius: 4px;
  color: white;
  margin: 1em;
`
const RejectBtn = styled.button`
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

//To-do queries- i'm going to have one page dedicated to queries
var manager_id = '"068dfbe3-e725-4ab2-aac9-307dd6659b22"'

const EMPLOYEES_LEAVE_REQUEST = gql`
{
  user(where: {manager_id: {_eq: ${manager_id}}}) {
    leave_requests {
      leave_id
      from
      to
      status
      requested_on
      no_of_days
      leave_type {
        name
      }
      user {
        first_name
        last_name
      }
    }
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

// const {data} = this.props;
//     const work = data.allContentfulWork.edges;
//     const array = work.map(({node}) => node.videoImage);
//     const srcArray = array.map((ele) => ele.map((obj) => obj.fixed.src));

export default function ShowRequests() {
  const [approveRequest] = useMutation(APPROVE_LEAVE_REQUEST)
  const [rejectRequest] = useMutation(REJECT_LEAVE_REQUEST)

  const { loading, error, data } = useQuery(EMPLOYEES_LEAVE_REQUEST)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`
  if (data) console.log(data)

  const obj = data.user[0]
  console.log(obj)

  const leaveRequest = obj.leave_requests
  console.log(leaveRequest)

  const fromDate = leaveRequest.map(req => req.from)
  console.log(fromDate)

  const dates = leaveRequest.map(req => req.from).map(date => date)
  console.log(dates)

  const datedate = fromDate.map(indv => console.log(indv))

  // data.user[0].leave_requests.map((req) =>

  //     req.from).map((fromDates) =>{
  //       return (
  //         <p>{fromDates}</p>
  //       )
  //       })
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
            <InfoWrap key={leaveID}>
              <h4>
                Name : {firstName} {lastName}
              </h4>
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
                        leave_id: "ecaf7229-8981-4da0-9f5e-f7f711f2e27d",
                      },
                    })
                      .then(data => {
                        console.log("leave id " + leaveID + "request rejected")
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
            </InfoWrap>
          </>
        )
      })}
    </>
  )
}

//{/*
{
  /* // {data.user[0].leave_requests.map((req) => */
}

//   req.to).map((toDates) =>{
//     return (
//       <p>Leave ends on : {toDates}</p>
//     )
//   })
// } */}
