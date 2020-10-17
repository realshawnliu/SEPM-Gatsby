import React from "react"
import styled from "styled-components";
import { Link } from "gatsby"
import style from "../components/layout.module.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "react-pro-sidebar/dist/css/styles.css"
import { SidebarHeader} from "react-pro-sidebar"

const SideBar = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 20px;
  display: flex;
  flex-direction: column;
`

function StaffLayout({ children }) {
  return (
    <div className="row">
      <div className="column left">
      </div>
      <SideBar>
        <SidebarHeader>Staff Page</SidebarHeader>
        <Link className={style.link} to={`/staff/staff-home/`}>Home</Link>
        <Link className={style.link} to={`/staff/staff-request/`}>put request</Link>
        <Link className={style.link} to={`/staff/staff-history/`}>request history</Link>
        <Link className={style.link} to={`/staff/staff-password/`}>change password</Link>
        <Link className={style.link} to={`/`}>login page</Link>
      </SideBar>

      <div className="column right">{children}</div>
    </div>
  )
}

export default StaffLayout
