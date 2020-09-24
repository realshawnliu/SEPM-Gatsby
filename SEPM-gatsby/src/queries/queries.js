import {gql} from '@apollo/client'

const APPROVE_LEAVE_REQUEST = gql`
mutation($leave_id: uuid!) {
  ApproveLeaveRequest(leave_id: $leave_id) {
    affected_rows
  }
}
`;