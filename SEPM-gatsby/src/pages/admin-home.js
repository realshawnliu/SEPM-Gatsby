import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import Layout from "../components/admin-layout"

export default function AdminHome() {
  return (
    <div>
      <Layout>
        admin home
        <p>see the list of all users</p>
        <p>deactivate account</p>
        <p>change the roles of users</p>
      </Layout>
    </div>
  )
}
