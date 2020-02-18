import { LEAVE_REQUEST, APPROVE_LEAVES, EMPTY_KRA } from "../actions/types";
const initialState = {
  leaveRequests: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LEAVE_REQUEST:
      return {
        ...state,
        leaveRequests: action.payload
      };
    case APPROVE_LEAVES:
      return {
        ...state,
        leaveRequests: action.payload
      };

    default:
      return state;
  }
}
