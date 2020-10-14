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

const USERS_LIST = gql`
  {
    user {
      user_id
      first_name
      last_name
      role_admin
      role_manager
      email
      acct_active
    }
  }
`

const DEACTIVATE_USER = gql`
  mutation($user_id: uuid!) {
    DeactivateUser(user_id: $user_id) {
      affected_rows
    }
  }
`

export default function ShowHistory() {
  const [deactive] = useMutation(DEACTIVATE_USER)

  const { loading, error, data } = useQuery(USERS_LIST)
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
      {data.user.map(req => {
        const userID = req.user_id
        const firstName = req.first_name
        const lastName = req.last_name
        const email = req.email
        const isAdmin = req.role_admin
        const isManager = req.role_manager
        const isActive = req.acct_active

        // console.log(userID)
        // console.log(last)
        // console.log(isActive)
        // console.log("role: " + role)

        return (
          <>
            <InfoWrap key={userID}>
              <h4>
                Name : {firstName} {lastName}
              </h4>

              <p>
                <b>role :</b>{" "}
                {isAdmin ? "Admin" : isManager ? "Manager" : "Staff"}
              </p>

              <p>
                <b>Email:</b> {email}
              </p>

              <p>
                <b>Status:</b> {isActive ? "Active" : "Deactivated"}
              </p>

              {isActive ? (
                <BtnBox>
                  <DeactivateBtn
                    onClick={e => {
                      e.preventDefault()
                      deactive({
                        variables: {
                          user_id: "068dfbe3-e725-4ab2-aac9-307dd6659b22",
                        },
                      })
                        .then(data => {
                          console.log(
                            "user " +
                              "068dfbe3-e725-4ab2-aac9-307dd6659b22" +
                              "has been deactivate"
                          )
                        })
                        .catch(e => {
                          console.log(e)
                        })
                    }}
                  >
                    {" "}
                    Deactivate
                  </DeactivateBtn>
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
