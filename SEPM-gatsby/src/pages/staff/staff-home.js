import React from "react"
import Layout from "../../components/staff-layout"
import ShowBalance from "../staff/showBalance"
import { Link } from "gatsby"
import style from "styled-components"



const Main = style.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3em;
`

export default function StaffHome() {

  console.log(window.userData)
  // if (window.userData.role_admin === true) {
  //   <Link to={`/admin/admin-home/`}>admin </Link>
  // }
  // if (window.userData.role_manager === true) {
  //   <Link to={`/manager/manager-home/`}>manager</Link>
  // }

  return (
    <div>
      <Layout>
        staff home
        <h4>{window.userData.role_admin ?
          <Link to={`/admin/admin-home/`}>switch to admin </Link> : ''
        }</h4>

        <h4>
          {window.userData.role_manager ?
            <Link to={`/manager/manager-home/`}>switch to manager </Link> : ''
          }</h4>

      </Layout>
      <ShowBalance />
    </div>
  )
}