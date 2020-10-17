// import React from "react"
// // import { css } from "@emotion/core"
// import style from "styled-components"
// import {
//     gql, useMutation,
//     useQuery
// } from '@apollo/client';


// const Error = style.h2`
//   color: red;
// `

// const GET_LIMIT = gql`
//  {
//     leave_type {
//     name
//     limit
//     }
// }
// `;

// const ANNUAL_LIMIT = gql`
// {
//   leave_type(where: {name: {_eq: "annual"}}) {
//     limit
//   }
// }`;

// const limit_ = annual_limit_json.data.leave_type[0].limit;
// const user_id = "\"068dfbe3-e725-4ab2-aac9-307dd6659b22\"";

// const ANNUAL_NOTIFICATION = gql`
// {
//   leave_balance_aggregate(where: {user_id: {_eq: "${user_id}"}, annual: {_eq: ${limit_}}}) {
//     aggregate {
//       count
//     }
//   }
// }
// `;


// let s

// if (annual_notification_json.leave_balance_aggregate.aggregate.count === 1) {
//     s.value = "Notification Visible";
// }
// else {
//     s.value = "No Notification";
// }


// const StaffNoti = () => {
//     const { loading, error, data } = useQuery(GET_LIMIT)
//     if (loading) return "loading..."
//     if (error) return `Error! ${error.message}`
//     if (data) console.log(data)

//     const annual_limit_json = useQuery(ANNUAL_LIMIT);

//     const annual_notification_json = useQuery(ANNUAL_NOTIFICATION);

//     const updateHandler = (carer, parental, sickWithCert,
//         sickWithoutCert, blood, unpaid, annual) => {

//     }





//     return (
//         <h2>Notification</h2>

//     )
// }


// export default StaffNoti