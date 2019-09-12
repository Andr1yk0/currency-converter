import {
  ActionReducerMap, createReducer,
  MetaReducer, on
} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {AppState, initialAppState} from "../state/app.state";
import {converterReducers} from "./converter.reducers";
import {graphReducers} from "./graph.reducers";
import {deleteError, setError} from "../actions/app.actions";

export const reducers: ActionReducerMap<AppState> = {
  converter: converterReducers,
  graph: graphReducers,
  error: createReducer(
    initialAppState.error,
    on(setError, (state, {error})=>{
      return error
    }),
    on(deleteError, (state)=>{
      return null
    })
  )
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
