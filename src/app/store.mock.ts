import {AppState, initialAppState} from "./store/state/app.state";
import {createSelector} from "@ngrx/store";
import {initialConverterState} from "./store/state/converter.state";
import {MockStoreConfig} from "@ngrx/store/testing";
import {Currency} from "./models/currency.model";

const initialState = {converter: {result: 1, currencies:[new Currency('USD')]}};
const selectConverter = createSelector(
  () => initialState,
  state => state.converter
);

const selectResult = createSelector(
  ()=> initialState,
  state => state.converter.result
);

const selectCurrenciesFrom = createSelector(
  ()=> initialState,
  state => state.converter.currencies
);

export const StoreMockConfig:MockStoreConfig<AppState> = {
  initialState: initialAppState,
  selectors: [
    {selector: selectConverter, value: {}},
    {selector: selectResult, value: 2},
    {selector: selectCurrenciesFrom, value: initialState.converter.currencies}
  ]
};
