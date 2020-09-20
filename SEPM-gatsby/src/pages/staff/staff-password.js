import React from "react"
// import { css } from "@emotion/core"
// import { Link } from "gatsby"
import Layout from "../../components/staff-layout"
import { Form, Col, Button } from "react-bootstrap"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"



const staffpassword = props => {

  const submitHandler = () => {
    console.log("clicked!")
  }

  return (
    <div>
      <Layout>
        <Form>
          <Form.Group controlId="">
            <Form.Label>Previous password</Form.Label>
            <Form.Control type="email" placeholder="Enter previous password" />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label>New password</Form.Label>
            <Form.Control type="password" placeholder="Enter new password" />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label>Confirm new password</Form.Label>
            <Form.Control type="password" placeholder="Enter new password" />
          </Form.Group>
          <Popup trigger={<button onClick={submitHandler}> Trigger</button>} position="right center">
            <div>Popup content here !!</div>
          </Popup>
        </Form>
      </Layout>
    </div>
  )
}

export default staffpassword;
