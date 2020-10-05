import React, { 
  // Component 
} from "react"
// import { css } from "@emotion/core"
// import { Link } from "gatsby"
import Layout from "../../components/manager-layout"
import ShowRequests from "../manager/showRequest"
// import style from "styled-components";

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
          manager home
          <p>see all the request</p>
          <p>see notification</p>
        </Layout>

        <RequestWrap>
          <ShowRequests/>
        </RequestWrap>
       

      </Wrapper>
      
    </div>
  )
}
