import { gql, useQuery, useMutation } from "@apollo/client"
import React, { Component } from "react"
import styled from "styled-components"


console.log(window.userData)
// console.log(window.userData.user_id)

let globalData = null;

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

var user_id = '"1564ed64-1e1d-4c76-ac1e-b1213dfaa6cb"'
// window.userData.user_id

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

function CancelHook(userID) {
  const [cancelRequest] = useMutation(CANCEL_LEAVE_REQUEST)

  cancelRequest({
    variables: {
      leave_id: userID,
    },
  })
}


function withMyHook(Component) {
  return function WrappedComponent(props) {
    const { loading, error, data } = useQuery(LEAVE_HISTORY)
    if (loading) return "loading..."
    if (error) return `Error! ${error.message}`
    return <Component {...props} myHookValue={data} />;
  }
}


class ShowHistory extends React.Component {


  render() {
    const data = this.props.myHookValue;
    const userData = this.props.userData
    // console.log("testing: ")
    // console.log(userData)
    const userID = userData.user_id


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

          console.log("testing2: ")
          console.log(data)

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
                        CancelHook(userID)
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
        })
        }
      </>
    )

  }
}

export default withMyHook(ShowHistory)