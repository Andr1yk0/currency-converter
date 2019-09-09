import {GraphState, initialGraphState} from "../state/graph.state";
import {EGraphActions, GraphActions} from "../actions/graph.actions";

export const graphReducers = (state = initialGraphState, action: GraphActions): GraphState => {
  switch (action.type) {
    case EGraphActions.SetData: {
      return {
        ...state,
        data: action.payload
      }
    }
    default:
      return state
  }
};
