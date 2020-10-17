import React from "react"
// import { css } from "@emotion/core"
// import { Link } from "gatsby"
import Layout from "../../components/staff-layout"
import ShowHistory from "../staff/showHistory"


export default function StaffHistory() {
// console.log(window.userData)

  return (
    <div>
      <Layout>

      </Layout>
      <ShowHistory userData={window.userData}/>
    </div>
  )
}
