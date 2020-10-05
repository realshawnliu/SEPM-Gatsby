import React from "react"
// import { css } from "@emotion/core"
// import { Link } from "gatsby"
import Layout from "../../components/staff-layout"
import ShowHistory from "../staff/showHistory"


export default function StaffHistory() {
  return (
    <div>
      <Layout>
        <p>request history page</p>
        <p>see leave request history</p>
        <p>cancel leave request</p>
      </Layout>
      <ShowHistory/>
    </div>
  )
}
