import React, { 
  // Component 
} from "react"
// import { css } from "@emotion/core"
// import { Link } from "gatsby"
import Layout from "../../components/manager-layout"
import ShowRequests from "../manager/showRequest"
import styled from "styled-components";
import {Link, graphql} from "gatsby"

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
        <Layout/>
        <nav>
            <ul>
              <Link>manager home</Link>
              <Link>see all request</Link>
              <Link>see notification</Link>
            </ul> 
          </nav>

        <RequestWrap>
          <ShowRequests/>
        </RequestWrap>
       

      </Wrapper>
      
    </div>
  )
}
