import {initialGraphState} from "../state/graph.state";
import {createReducer, on} from "@ngrx/store";
import {setDateFrom, setDateTo, setRatesHistory} from "../actions/graph.actions";

export const graphReducers = createReducer(
  initialGraphState,
  on(setRatesHistory, (state, {history}) => {
    return {
      ...state,
      ratesHistory: history
    }
  }),
  on(setDateFrom, (state, {date}) => {
    return {
      ...state,
      dateFrom: date
    }
  }),
  on(setDateTo, (state, {date}) => {
    return {
      ...state,
      dateTo: date
    }
  })
);
