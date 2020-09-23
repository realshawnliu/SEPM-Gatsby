import React, { Component } from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"
import Layout from "../../components/staff-layout"
import { Form, Col, Button } from "react-bootstrap"
import DatePicker from "react-datepicker"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import "./request.css"
// import { useQuery, gql, useMutation} from "@apollo/client";

// const LEAVE_REQUEST = gql`
// mutation($user_id: uuid!, $from: date!, $to: date!, $leave_type_id: uuid!, $no_of_days: Int!, $requested_on: date!, $status: String!) {
//   AddLeaveRequest(user_id: $user_id, from: $from, to: $to, leave_type_id: $leave_type_id, no_of_days: $no_of_days, requested_on: $requested_on, status: $status) {
//     affected_rows
//   }
// }
// `;

// const [addLeaveRequest] = useMutation(LEAVE_REQUEST)

class StaffRequest extends Component {
  state = {
    startDate: new Date(),
  }

  handleChange = date => {
    this.setState({
      startDate: date,
    })
  }

  submitHandler = () => {
    // addLeaveRequest({
    //   variables: {
    //     user_id: "d0bc7c2d-a54e-4d9b-8d7f-0a982086de6a",
    //     from: "2020-09-12",
    //     to: "2020-09-17",
    //     leave_type_id: "6c95ef3d-35e8-4cef-bfce-3dccedc4d908",
    //     no_of_days: 0,
    //     requested_on: "",
    //     status: "",
    //   },
    // })
    //   .then(data => {
    //     var s = document.getElementById("Text_Box")
    //     s.value = "leave request added!!"
    //     console.log(data)
    //   })
    //   .catch(e => {
    //     var s = document.getElementById("Text_Box")
    //     s.value = e.message
    //     console.log(e)
    //   })
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
                <button onClick={this.submitHandler}>Submit</button>
              </Col>
              {/* 
              <Col>
                {" "}
                <Popup
                  trigger={<button> Trigger</button>}
                  position="right center"
                >
                  <div>Popup content here !!</div>
                </Popup>
              </Col> */}
            </Form.Group>
          </Form>

          <Popup
            trigger={<button className="button"> Open Modal </button>}
            modal
            nested
          >
            {close => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Modal Title </div>
                <div className="content">
                  {" "}
                  1
                  <br />2
                </div>
                <div className="actions">
                  <Popup
                    trigger={<button className="button"> Trigger </button>}
                    position="top center"
                    nested
                  >
                    <span>3</span>
                  </Popup>
                  <button
                    className="button"
                    onClick={() => {
                      console.log("modal closed ")
                      close()
                    }}
                  >
                    close modal
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </Layout>
      </div>
    )
  }
}

export default StaffRequest
