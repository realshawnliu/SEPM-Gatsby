import React from "react"
// import { css } from "@emotion/core"
// import { Link } from "gatsby"
import Layout from "../../components/admin-layout"
import ChangeLimit from "../admin/changeLimit"

export default function AdminLimit() {
  return (
    <div>
      <Layout>
        <ChangeLimit/>
      </Layout>
    </div>
  )
}