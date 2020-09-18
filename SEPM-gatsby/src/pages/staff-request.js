import React, { Component } from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import Layout from "../components/staff-layout"
import { Form, Col, Button } from "react-bootstrap"
import DatePicker from "react-datepicker"

class StaffRequest extends Component {
  state = {
    startDate: new Date(),
  }

  handleChange = date => {
    this.setState({
      startDate: date,
    })
  }

  render() {
    return (
      <div>
        <Layout>
          <Form>
            <h2>Enter the Details of leave</h2>

            <Form.Group controlId="">
              <Form.Label>
                <b>Leave Start</b>
              </Form.Label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="">
              <Form.Label>
                <b>Leave End</b>
              </Form.Label>
              <DatePicker
                selected={this.state.endDate}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="">
              <Form.Label>
                <b>Leave Tpye</b>
              </Form.Label>

              {["radio"].map(type => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check
                    type={type}
                    id={`default-${type}`}
                    label={`annual leave`}
                  />
                  <Form.Check
                    type={type}
                    id={`disabled-default-${type}`}
                    label={`carer’s leave `}
                  />
                  <Form.Check
                    type={type}
                    id={`default-${type}`}
                    label={`sick leave with certificate`}
                  />
                  <Form.Check
                    type={type}
                    id={`default-${type}`}
                    label={`sick leave without certificate`}
                  />
                  <Form.Check
                    type={type}
                    id={`disabled-default-${type}`}
                    label={`parental leave `}
                  />
                  <Form.Check
                    type={type}
                    id={`default-${type}`}
                    label={`unpaid leave`}
                  />
                </div>
              ))}

              <Col xs="auto">
                <Button type="submit" className="mb-2">
                  Submit
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Layout>
      </div>
    )
  }
}

export default StaffRequest
