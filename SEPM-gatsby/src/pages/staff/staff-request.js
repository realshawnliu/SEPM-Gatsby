import React, { useState } from "react"
import Layout from "../../components/staff-layout"
import { Form, Col, Button, ButtonGroup } from "react-bootstrap"
import styled from "styled-components";
import { gql, useMutation} from '@apollo/client';



//query
const LEAVE_REQUEST = gql`
mutation(
  $user_id: uuid!,
  $from: date!, 
  $to: date!, 
  $leave_type_id: uuid!, 
  $no_of_days: Int!, 
  $requested_on: date!, 
  $status: String!
) {
  AddLeaveRequest(
    user_id: $user_id,
    from: $from,
    to: $to,
    leave_type_id: $leave_type_id,
    no_of_days: $no_of_days,
    requested_on: $requested_on,
    status: $status
  ) {
    affected_rows
  }
}
`;

// const client = new ApolloClient({
//   uri: 'https://fresh-jackal-96.hasura.app/v1/graphql',
//   cache: new InMemoryCache()
// });

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
  // const [radioValue, setRadioValue] = useState('1');

//   return (
//     <>
//       {radios.map((radio, idx) => (
//        <ButtonGroup toggle className="mb-3">
//         <div class="form-check">
//           <input type="radio"  key={idx} name="tyepOfLeave" value={radio.value} checked={radioValue === radio.value}
//           onChange={this.handleFormChange}
//           ></input>
//           {radio.name}
//         </div>
//       </ButtonGroup>
//       ))}
//     </>
//   )
// };

const StaffRequest2 = () => {
    const [addLeaveRequest] =useMutation(LEAVE_REQUEST);
    const [leaveStartDate, setLeaveStartDate] = useState('')
    const[leaveEndDate, setLeaveEndDate] = useState('')
    const [radioValue, setRadioValue] = useState('1');
    
// shouldnt need to hard code the value but will change later on , when i can send data 
    const radios = [
        {name: 'annual leave', value:'08a1ac22-1b41-47fd-8086-1d901eff6383'},
        {name: "carer's leave", value:'75e4f1e4-5f71-4ab2-9d78-ddac68bcffbf'},
        {name: 'sick leave with certificate', value:'452eed0f-fe7a-4985-a474-00c692fa7e14'},
        {name: 'sick leave without certificate', value: 'b586a842-2059-4060-95dc-d2227cdd1c57'},
        {name: 'parental leave', value:'6c95ef3d-35e8-4cef-bfce-3dccedc4d908'},
        {name: 'unpaid leave', value: '9b157769-98e3-4f6b-b587-07773303b273'},
        {name: 'blood_donor', value:'2e58c789-b8b8-41ce-9d01-0a6d54cc7d39'}
      ];

    return (
      <div className="mb-2">
        <Wrapper>
          <Layout/>
            {/* <Mutation mutation ={LEAVE_REQUEST}>

            </Mutation> */}
            {/* <Mutation mutation={LEAVE_REQUEST}>
              {(addLeaveRequest,{loading, error, data}) => (
                   */}
                <Form 
                onSubmit={(e) => {
                  e.preventDefault();
                  addLeaveRequest({
                    variables: {
                      user_id: "d0bc7c2d-a54e-4d9b-8d7f-0a982086de6a",
                      from: "2020-09-23",
                      to: "2020-09-27",
                      leave_type_id: "08a1ac22-1b41-47fd-8086-1d901eff6383",
                      no_of_days: 7,
                      requested_on: "",
                      status: "PENDING"
                  },
                  }).then((data) => {
                      console.log(data)
                  })
                  .catch((e) => {
                      console.log(e)
                  });
                }}
              >
                <h2>Enter the Details of leave</h2>
                  <Form.Group controlId="">
                    <Form.Label>
                      <b>Leave Start</b>
                    </Form.Label>
                    <input 
                      type="text" 
                      name="leaveStartDate"
                      value={leaveStartDate}
                      onChange={(event) => (
                          setLeaveStartDate(event.target.value)
                      )}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="">
                    <Form.Label>
                      <b>Leave End</b>
                    </Form.Label>
                    <input 
                      type="text"
                      name="leaveEndDate"
                      value={leaveEndDate}
                      onChange={(event) => (
                          setLeaveEndDate(event.target.value)
                      )}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="">
                    <Form.Label>
                      <b>Leave Type</b>
                    </Form.Label>

                    {radios.map((radio) => (
                    <ButtonGroup toggle className="mb-3">
                      <div class="form-check">
                        <input type="radio"  key={radio.uniqueId} name="tyepOfLeave" value={radio.value} checked={radioValue === radio.value}
                        onChange={(event) => {
                            setRadioValue(event.target.value)
                        }}
                        ></input>
                        {radio.name}
                      </div>
                    </ButtonGroup>
                    ))} 

                    <Col xs="auto">
                      <Button type="submit" className="mb-2">
                        Submit
                      </Button>
                    </Col>
{/* 
                    <div style={{ padding: '20px' }}>
                        {loading && <p>Loading...</p>}
                        {error && (
                        <p>
                            An unknown error has occured, please try again
                            later...
                        </p>
                        )}
                        {data && <p>{data.signUp.result}</p>}
                     </div> */}

                  </Form.Group>
                </Form>
              )}
            {/* </Mutation> */}
         </Wrapper> 
      </div>
    )
  }

export default StaffRequest2