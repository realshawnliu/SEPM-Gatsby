import React from "react"
import Layout from "../../components/staff-layout"
import ShowBalance from "../staff/showBalance"
import StaffNoti from "../staff/staffNoti"
import { Link } from "gatsby"
import styled from "styled-components";

const Wrap =styled.div`
  display:flex;
  padding: 3em;
  flex-direction: column;
  justify-content: center;
  
`

const Main = styled.div`
    display: flex;
    flex-direction: row;

`

export default function StaffHome() {

  // console.log(window.userData)

  return (
    <Main>
      <Layout/>
      <Wrap>
        <h1>Welcome {window.userData.first_name}</h1>
          <h4>{window.userData.role_admin ?
            <Link to={`/admin/admin-home/`}>switch to admin </Link> : ''
          }</h4>

          <h4>
            {window.userData.role_manager ?
              <Link to={`/manager/manager-home/`} >switch to manager </Link> : ''
            }</h4>

          {/* <StaffNoti /> */}

        <ShowBalance/>

<<<<<<< HEAD
      </Wrap>
       
    </Main>
=======
      <ShowBalance userData={window.userData}/>
    </div>
>>>>>>> 8cda464f123d89658d3dff41faf00e0ef2fe67da
  )
}