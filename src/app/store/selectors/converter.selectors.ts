import {AppState} from "../state/app.state";

export const selectConverterData = (state: AppState) => state.converter;

export const selectCurrencyFrom = (state: AppState) => state.converter.currencyFrom;

export const selectCurrencyTo = (state: AppState) => state.converter.currencyTo;

export const selectResult = (state: AppState) => state.converter.result;
