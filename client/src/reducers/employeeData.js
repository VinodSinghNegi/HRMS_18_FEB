import { PARTICULAR_EMP, CLEAR_USERS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case PARTICULAR_EMP:
      return {
        ...state,
        employeeData: action.payload
      };
    case CLEAR_USERS:
      return {};
    default:
      return state;
  }
}
