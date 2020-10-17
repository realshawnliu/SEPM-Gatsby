import React, {
  // Component 
} from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
import Layout from "../../components/manager-layout"
import ShowRequests from "../manager/showRequest"
import ManagerNoti from "../manager/managerNoti"
import style from "styled-components";

const Wrapper = style.div`
  display: flex;
`

const RequestWrap = style.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`


export default function ManagerHome() {
  return (
    <div>
      <Wrapper>
        <Layout>
          <h4>{window.userData.role_admin ?
            <Link to={`/admin/admin-home/`}>switch to admin </Link> : ''
          }</h4>

          <h4>
            <Link to={`/staff/staff-home/`}>switch to staff </Link>
          </h4>

          {/* <ManagerNoti /> */}
        </Layout>

        <RequestWrap>
          <ShowRequests />
        </RequestWrap>


      </Wrapper>

    </div>
  )
}
