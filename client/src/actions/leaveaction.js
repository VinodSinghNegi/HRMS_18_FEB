import Axios from "../api/axios"
import {GET_LEAVE,APPLY_LEAVE,DELETE_LEAVE,GET_ERRORS,LEAVE_SEEDS} from "./types"
import React from "react"
import { flush } from "./flushRedux";

export const getLeave=()=>async dispatch=>{
    try {
        const res=await Axios.get("/getleave")
        dispatch({
            type:GET_LEAVE,
            payload:res.data
        })
        
    } catch (err) {

        if (err.response.data.error === "Please authenticate") {
            dispatch(flush());
          }
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
    }
}

export const applyLeave=(formdata)=>async dispatch=>{
    try {
        const res=await Axios.post("/applyleave",formdata)
        dispatch(getLeave())
        dispatch({
            type: GET_ERRORS,
            payload:res.data
          });

    } catch (err) {
        if (err.response.data.error === "Please authenticate") {
            dispatch(flush());
          }
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
    }

}

export const deleteLeave=(id)=>async dispatch=>{
    try {
       const res= await Axios.delete(`/deleteleave/${id}`)
        dispatch({
            type:DELETE_LEAVE,
            payload:id
        })
        dispatch({
            type:GET_ERRORS,
            payload:res.data
        })
        
    } catch (err) {

        if (err.response.data.error === "Please authenticate") {
            dispatch(flush());
          }
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
    }
}
export const getLeaveSeeds=()=>async dispatch=>{
    try {
        const res=await Axios.get("/leave_seeds")
        dispatch({
            type:LEAVE_SEEDS,
            payload:res.data
        })
        
    } catch (err) {

        if (err.response.data.error === "Please authenticate") {
            dispatch(flush());
          }
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
    }
}