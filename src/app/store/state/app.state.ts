import {ConverterState, initialConverterState} from "./converter.state";
import {GraphState, initialGraphState} from "./graph.state";

export interface AppState {
  converter: ConverterState,
  graph: GraphState,
  error: string
}

export const initialAppState: AppState = {
  converter: initialConverterState,
  graph: initialGraphState,
  error: null
};

