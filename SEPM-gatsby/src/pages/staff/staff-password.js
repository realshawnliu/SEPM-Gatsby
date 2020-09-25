import React from "react"
// import { css } from "@emotion/core"
// import { Link } from "gatsby"
import Layout from "../../components/staff-layout"
import { Form, Col, Button } from "react-bootstrap"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import style from "styled-components"
import {gql , useMutation} from '@apollo/client';
import useForm from "../staff/useForm";
import PropTypes from 'prop-types';
import Reset from '../staff/Reset'

//style
const Wrapper = style.div`
  display: flex;
  flex-direction: row;
`
const FormWrap = style.div`
  margin: 5%;
  display: flex;
  justify-content: center;
  width: 70%;
`



const Staffpassword = () => (

    <Wrapper>
      <Layout/>
      <FormWrap>
        <Reset />
      </FormWrap>
    </Wrapper>
  
)

export default Staffpassword;
