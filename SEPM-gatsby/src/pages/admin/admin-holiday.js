import React from "react"
// import { css } from "@emotion/core"
// import { Link } from "gatsby"
import Layout from "../../components/admin-layout"
import AddHoliday from "../admin/addHoliday"


export default function AdminHoliday() {
  return (
    <div>
      <Layout>
        <AddHoliday/>
      </Layout>
    </div>
  )
}
