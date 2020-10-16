import { gql, useQuery, useMutation } from "@apollo/client"
import React, {useState} from "react"
import{ Link} from "gatsby"
import styled from "styled-components"
import style from "../admin/showUser.module.css"

//styling
const InfoWrap = styled.div`
  background: #EBE8E8;
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

const ChangeRoleBtn = styled.button`
  background: #9E9999;
  border: none;
  border-radius: 4px;
  color: black;
  margin: 1em;
`


const BtnBox = styled.div`
  display: flex;
  width: 10%;
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

export default function ShowHistory() {
  const[role, setRole] =useState("");
  const [deactive] = useMutation(DEACTIVATE_USER);
  const[updateRole] = useMutation(UPDATE_ROLE);

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
              <p>
                <b>Name</b> : {firstName} {lastName}
              </p>

              <p>
                <b>role :</b>{" "}
                {isAdmin ? "Admin" : isManager ? "Manager" : "Staff"}

                <BtnBox>
                  <button className={isAdmin? style.trueRole : style.falseRole}
                    onclick= {e => {
                      e.preventDefault()
                      updateRole({
                        variables:{
                          user_id: userID,
                          role_admin: true,
                          role_manager: {},
                        }
                      })
                    }}
        
                  >Admin</button>
                  <button className={isManager? style.trueRole: style.falseRole}
                    name="managerBtn"
                  >Manager</button>
                </BtnBox>
                
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
                          user_id: userID,
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
                  <Link 
                    className={style.changeRole} 
                    to="/admin/changeRolePage/"
                    state={{user: userID}}
                  
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
