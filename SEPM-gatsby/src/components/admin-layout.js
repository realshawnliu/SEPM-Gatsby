import React from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
// import { Col, Container, Row } from "react-bootstrap"

import style from "../components/layout.module.css";
import "bootstrap/dist/css/bootstrap.min.css"
import {
  ProSidebar,
  Menu,
  MenuItem,
  // SubMenu
} from "react-pro-sidebar"
import "react-pro-sidebar/dist/css/styles.css"
import {
  SidebarHeader,
  // SidebarFooter,
  // SidebarContent
} from "react-pro-sidebar"

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
        {/* <ProSidebar>
          <SidebarHeader>Hi, Admin (admin name)</SidebarHeader>
          <Menu iconShape="square">
            <MenuItem>
              <Link to={`/admin/admin-home/`}>Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/admin/createAccount/`}>create new account</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/admin/admin-holiday/`}>add public holiday</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/admin/admin-limit/`}>change leave limit</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/`}>login page</Link>
            </MenuItem>
          </Menu>
          {/* <SidebarFooter>footer</SidebarFooter> */}
        {/* </ProSidebar> */} 

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
