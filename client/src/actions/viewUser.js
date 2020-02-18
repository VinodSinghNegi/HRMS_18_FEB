import { VIEW_USERS, GET_ERRORS,PARTICULAR_EMP } from "./types";
// import Axios from "axios";
import Axios from "../api/axios";

import { flush } from "./flushRedux";

export const viewUsers = skip => dispatch => {
  Axios.get(`/showemployees/${skip}`)
    .then(res => {
      dispatch({
        type: VIEW_USERS,
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
export const viewProfile = userId => dispatch => {
  Axios.get(`/hr/user/profile/${userId}`)
    .then(res => {
      dispatch({
        type: PARTICULAR_EMP,
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
