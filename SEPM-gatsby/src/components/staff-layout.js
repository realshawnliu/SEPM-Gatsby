import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import { Col, Container, Row } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import "react-pro-sidebar/dist/css/styles.css"
import { SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar"

function StaffLayout({ children }) {
  return (
    <div className="row">
      <div className="column left">
        <ProSidebar>
          <SidebarHeader>Hi, Staff (staff name)</SidebarHeader>
          <Menu iconShape="square">
            <MenuItem>
              <Link to={`/staff-home/`}>Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/staff-request/`}>put request</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/staff-history/`}>request history</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/staff-password/`}>change password</Link>
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

export default StaffLayout
