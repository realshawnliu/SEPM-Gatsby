import React from "react"
import styled from "styled-components";
import { Link } from "gatsby"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-pro-sidebar/dist/css/styles.css"
import style from "../components/layout.module.css";
import { SidebarHeader} from "react-pro-sidebar"

const SideBar = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 20px;
  display: flex;
  flex-direction: column;
`


export default function ManagerLayout({ children }) {
  return (
    <div className="row">
      <div className="column left">
        <SideBar>
        <SidebarHeader>Manager Page</SidebarHeader>
            <Link className={style.link}  to={`/manager/manager-home/`}>Home</Link>
            <Link className={style.link}  to={`/manager/manager-stafflist/`}>Staff List</Link>
            <Link className={style.link}  to={`/`}>login page</Link>
        </SideBar>
      </div>

      <div className="column right">{children}</div>
    </div>
  )
}
