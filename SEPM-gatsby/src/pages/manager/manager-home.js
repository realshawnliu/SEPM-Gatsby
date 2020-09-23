import React, { Component } from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import Layout from "../../components/manager-layout"
import ShowRequests from "../manager/showRequest"
import style from "styled-components";


export default function ManagerHome() {
  return (
    <div>
      <Layout>
        manager home
        <p>see all the request</p>
        <p>approve/reject</p>
        <p>see notification</p>
      </Layout>
      <ShowRequests/>
    </div>
  )
}
