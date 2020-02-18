import { ADD_KRA, VIEW_KRA, GRAPH_KRA } from "../actions/types";
import { stat } from "fs";

const initialstate = {
  fillKra: [],
  viewKraData: [],
  graphdata: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case ADD_KRA: {
      if (action.payload.length > 1) {
        return { ...state, fillKra: [...action.payload] };
      } else {
        state.fillKra.map(ele => {
          if (ele._id === action.payload.id) {
            ele.value = action.payload.value;
          }
        });
      }
      return state;
    }

    case VIEW_KRA: {
      if (action.payload === null) {
        return initialstate;
      }
      return { ...state, viewKraData: action.payload };
    }
    case GRAPH_KRA: {
      if (action.payload === null) {
        return initialstate;
      }
      return { ...state, graphdata: action.payload };
    }
    default:
      return state;
  }
}
