import React from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
// import { Col, Container, Row } from "react-bootstrap"
import style from "../components/layout.module.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "react-pro-sidebar/dist/css/styles.css"


import styled from "styled-components";

const SideBar = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 20px;
  display: flex;
  flex-direction: column;
`
export default function AdminLayout({ children }) {
  return (
    <div className="row">
      <div className="column left">
        <SideBar>
            <Link className={style.link} to={`/admin/admin-home/`}>Home</Link>
            <Link className={style.link} to={`/admin/createAccount/`}>create new account</Link>
            <Link className={style.link} to={`/admin/admin-holiday/`}>add public holiday</Link>
            <Link className={style.link} to={`/admin/admin-limit/`}>change leave limit</Link>
        </SideBar>
      </div>

      <div className="column right">{children}</div>
    </div>
  )
}
