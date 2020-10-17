// import React from "react"
// // import { css } from "@emotion/core"
// import { Link } from "gatsby"
// // import { Form, Col, Button } from "react-bootstrap"
// import style from "styled-components"
// import {
//     gql, useMutation,
//     useQuery
// } from '@apollo/client';
// // import PropTypes from 'prop-types';
// import { Formik, Form, Field, errors, ErrorMessage } from 'formik';


// const Error = style.h2`
//   color: red;
// `

// const ANNUAL_LIMIT = gql`
// {
//   leave_type(where: {name: {_eq: "annual"}}) {
//     limit
//   }
// }
// `;

// // const manager_id = "\"068dfbe3-e725-4ab2-aac9-307dd6659b22\"";

// // const annual_limit_json = useQuery(ANNUAL_LIMIT);

// // const limit_ = annual_limit_json.data.leave_type[0].limit;


// // const MANAGER_NOTIFICATION = gql`
// // {
// //   leave_balance(where: {annual: {_eq: ${limit_}}, user: {manager_id: {_eq: "${manager_id}"}}}){
// //     user{
// //       first_name
// //       last_name
// //       email
// //     }
// //   } 
// // }
// // `;




// const ManagerNoti = () => {
//     //   const { loading, error, data } = useQuery(ANNUAL_LIMIT)
//     //   if (loading) return "loading..."
//     //   if (error) return `Error! ${error.message}`
//     //   if (data) console.log(data)

//     const loginHandler = (email, password, role) => {

//     }



//     return (
//         console.log()
//     )
// }


// export default ManagerNoti