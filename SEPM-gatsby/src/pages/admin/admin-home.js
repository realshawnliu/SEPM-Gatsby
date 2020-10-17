import React from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
import Layout from "../../components/admin-layout"
import ShowUser from "../admin/showUser"


export default function AdminHome() {
  // console.log(window.userData)

  return (
    <div>
      <Layout>
        <h4>
          {window.userData.role_manager ?
            <Link to={`/manager/manager-home/`}>switch to manager </Link> : ''
          }</h4>

        <h4>
          <Link to={`/staff/staff-home/`}>switch to staff </Link>
        </h4>
      </Layout>
      <ShowUser />

    </div>
  )
}
