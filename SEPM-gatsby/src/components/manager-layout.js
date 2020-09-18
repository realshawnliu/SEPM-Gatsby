import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { Col, Container, Row } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import "react-pro-sidebar/dist/css/styles.css"
import { SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar"

export default function ManagerLayout({ children }) {
  return (
    <div className="row">
      <div className="column left">
        <ProSidebar>
          <SidebarHeader>Hi, Manager (manager name)</SidebarHeader>
          <Menu iconShape="square">
            <MenuItem>
              <Link to={`/manager-home/`}>Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/manager-stafflist/`}>Staff List</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/`}>login page</Link>
            </MenuItem>
          </Menu>
          {/* <SidebarFooter>footer</SidebarFooter> */}
        </ProSidebar>
      </div>

      <div className="column right">{children}</div>
    </div>
  )
}
