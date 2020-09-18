import React from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
import Layout from "../components/staff-layout"
import { Form, Col, Button } from "react-bootstrap"

export default function StaffPassword() {
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Layout>
    </div>
  )
}
