import React from "react"
import Layout from "../../components/staff-layout"
import ShowBalance from "../staff/showBalance"
import StaffNoti from "../staff/staffNoti"
import { Link } from "gatsby"
import style from "styled-components"



const Main = style.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3em;
`

export default function StaffHome() {

  // console.log(window.userData)

  return (
    <div>
      <Layout>
        <h4>{window.userData.role_admin ?
          <Link to={`/admin/admin-home/`}>switch to admin </Link> : ''
        }</h4>

        <h4>
          {window.userData.role_manager ?
            <Link to={`/manager/manager-home/`} >switch to manager </Link> : ''
          }</h4>

        {/* <StaffNoti /> */}
      </Layout>

      <ShowBalance/>
    </div>
  )
}