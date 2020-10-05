import React from "react"
// import { css } from "@emotion/core"
import { Link } from "gatsby"
import { Form, Col, Button } from "react-bootstrap"

export default function Home() {
  return (
    <div>
      <p>Login page</p>
      <Link to={`/admin/admin-home/`}>admin </Link>

      <Link to={`/staff/staff-home/`}>staff </Link>

      <Link to={`/manager/manager-home/`}>manager</Link>

      <Form>
        <Form.Group controlId="">
          <Form.Label>UserID</Form.Label>
          <Form.Control type="ID" placeholder="Enter userID" />
        </Form.Group>

        <Form.Group controlId="">
          <Form.Label>password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>

        {["radio"].map(type => (
          <div key={`custom-inline-${type}`} className="mb-3">
            <Form.Check custom inline label="Admin" type={type} id={``} />
            <Form.Check custom inline label="Staff" type={type} id={``} />
            <Form.Check custom inline label="Manager" type={type} id={``} />
          </div>
        ))}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
