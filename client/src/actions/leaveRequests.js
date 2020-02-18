// import Axios from "axios";
import Axios from "../api/axios";

import { LEAVE_REQUEST, APPROVE_LEAVES, GET_ERRORS } from "./types";
import { setCurrentComponent } from "./componentActions";
import LeaveRequest from "../components/leaveRequests";
import React from "react";
import { flush } from "./flushRedux";

var response = null;
export const getLeaveRequest = () => dispatch => {
  Axios.get("/manager/leave/employees")
    .then(res => {
      dispatch({
        type: LEAVE_REQUEST,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.error === "Please authenticate") {
        dispatch(flush());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const actionleaves = (id, value) => async dispatch => {
  Axios.post(`/manager/updateleave/employees/${id}/${value}`)
    .then(res => {
      dispatch({
        type: APPROVE_LEAVES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
