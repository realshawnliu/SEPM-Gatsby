import { gql, useQuery, useMutation } from "@apollo/client"
import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import style from "../admin/showUser.module.css"

//styling
const TextInfo = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
`
const InfoWrap = styled.div`
  background: transparent;
  width: 80%;
  margin-bottom: 1em;
  display:flex;
  flex-direction: row;
  border-raidus: 5px;
  border: 1px solid rgba(254, 254, 254,.3);
  padding: 10px;
 
`
const DeactivateBtn = styled.button`
  background: transparent;
  border-radius: 5px;
  border-radius: 4px;
  color: white;
  margin: 1em;
  height:20%;
  padding: 10px;
  white-space: nowrap;
  font-family: 'Quicksand';
  border: 1px solid rgba(254, 254, 254,.3);

  &:hover{
    background: rgba(240, 116, 112, 0.5);
  }
`

const RoleBox = styled.div`
  display:flex;
  flex-direction: row;
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
      manager_id
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
const UPDATE_ROLE = gql`
mutation($user_id: uuid!, $role_admin: Boolean!, $role_manager: Boolean!, $manager_id: uuid!) {
  UpdateRole(user_id: $user_id, role_admin: $role_admin, role_manager: $role_manager, manager_id: $manager_id) {
    affected_rows
  }
}
`

export default function ShowHistory({ userData }) {
  const [role, setRole] = useState("");
  const [deactive] = useMutation(DEACTIVATE_USER);
  const [updateRole] = useMutation(UPDATE_ROLE);

  const { loading, error, data } = useQuery(USERS_LIST)
  if (loading) return "loading..."
  if (error) return `Error! ${error.message}`


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
        const managerID = req.manager_id


        // console.log(userID)
        // console.log(last)
        // console.log(isActive)
        // console.log("role: " + role)

        return (
          <>
            <InfoWrap key={userID}>
              <TextInfo>
                <p>
                  <b>Name</b> : {firstName} {lastName}
                </p>

                <div className={style.falseRole}>{isAdmin && isManager ? 
                " admin & manager " : isAdmin ? "admin" : isManager ? 
                "manager" : "staff"}</div>

                <p>
                  <b>Email:</b> {email}
                </p>

                <p>
                  <b>Status:</b> {isActive ? "Active" : "Deactivated"}
                </p>
              </TextInfo>

              {isActive ? (
                <BtnBox>
                  <DeactivateBtn
                    onClick={e => {
                      e.preventDefault()
                      deactive({
                        variables: {
                          user_id: userID,
                        },
                      })
                        .then(data => {
                          console.log(
                            "user " +
                            userID +
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
                  <Link
                    className={style.changeRole}
                    to="/admin/changeRolePage/"
                    state={{ user: userID }}

                  >Change Role</Link>

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
