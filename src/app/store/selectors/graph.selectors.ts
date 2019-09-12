import {AppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {GraphState} from "../state/graph.state";

export const selectGraph = (state: AppState) => state.graph;

export const selectGraphRatesHistory = createSelector(
  selectGraph,
  (state: GraphState) => state.ratesHistory
);

export const selectGraphDateTo = createSelector(
  selectGraph,
  (state: GraphState) => state.dateTo
);

export const selectGraphDateFrom = createSelector(
  selectGraph,
  (state: GraphState) => state.dateFrom
);
