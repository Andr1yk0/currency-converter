import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {AppState, initialAppState} from "../state/app.state";
import {converterReducers} from "./converter.reducers";
import {graphReducers} from "./graph.reducers";
import {AppActions, EAppActions} from "../actions/app.actions";

export const reducers: ActionReducerMap<AppState> = {
  converter: converterReducers,
  graph: graphReducers,
  error: (state = initialAppState.error, action: AppActions): string => {
    switch (action.type) {
      case EAppActions.SetError: {
        return action.payload
      }
      case EAppActions.DeleteError: {
        return null;
      }
      default:
        return state
    }
  }
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
