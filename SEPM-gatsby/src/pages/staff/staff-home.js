import React from "react"
// import { css } from "@emotion/core"
// import { Link } from "gatsby"
import Layout from "../../components/staff-layout"
import ShowBalance from "../staff/showBalance"


export default function StaffHome() {
  return (
    <div>
      <Layout>
        staff home
        <p>see leave balance</p>
        <p>receive email confirmation</p>
        <p>see notification</p>
      </Layout>
      <ShowBalance />
    </div>
  )
}
