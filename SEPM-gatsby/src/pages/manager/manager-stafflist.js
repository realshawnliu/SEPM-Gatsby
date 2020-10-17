import React from "react"
// import { css } from "@emotion/core"
// import { Link } from "gatsby"
import Layout from "../../components/manager-layout"
import ShowStaff from "../manager/showStaff"


export default function ManagerList() {
  return (
    <div>
      <Layout>
        <ShowStaff/>
      </Layout>
    </div>
  )
}
