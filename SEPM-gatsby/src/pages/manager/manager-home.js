import React, {
  // Component 
} from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
import Layout from "../../components/manager-layout"
import ShowRequests from "../manager/showRequest"
// import ManagerNoti from "../manager/managerNoti"
import styled from "styled-components";
import { graphql} from "gatsby"


const Wrapper = styled.div`
  display: flex;
`

const RequestWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`


export default function ManagerHome() {
  return (
    <div>
      <Wrapper>

        <Layout>
          

          {/* <ManagerNoti /> */}
        </Layout>

        <Layout/>
        <nav>
            <ul>
              <Link>manager home</Link>
              <Link>see all request</Link>
              <Link>see notification</Link>
            </ul> 
          </nav>
    
    <h4>{window.userData.role_admin ?
            <Link to={`/admin/admin-home/`}>switch to admin </Link> : ''
          }</h4>

          <h4>
            <Link to={`/staff/staff-home/`}>switch to staff </Link>
          </h4>


        <RequestWrap>
          <ShowRequests />
        </RequestWrap>


      </Wrapper>

    </div>
  )
}
