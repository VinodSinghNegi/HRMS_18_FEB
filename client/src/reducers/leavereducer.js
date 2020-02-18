import {GET_LEAVE,APPLY_LEAVE,DELETE_LEAVE,LEAVE_SEEDS} from "../actions/types"
const initialState={
    leaves:[],
    seeds:[],
    loading:true
}

export default function (state=initialState,action){
    const {type,payload}=action

    switch(type){
        case GET_LEAVE:
            return {...state,leaves:payload,loading:false}
        case DELETE_LEAVE:
            return {
                ...state,
                leaves:state.leaves.filter(e=>e._id!==payload),
                loading:false
            }
        case LEAVE_SEEDS:
            return {
                ...state,
                seeds:payload,
                loading:false
            }
            default:
                return state
    }

}