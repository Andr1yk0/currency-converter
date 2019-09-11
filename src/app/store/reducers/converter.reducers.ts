import {initialConverterState} from "../state/converter.state";
import {createReducer, on} from "@ngrx/store";
import {
  calculateResult, resetResult,
  setAmount,
  setCurrencyFrom, setCurrencyTo, setLatestDate, switchCurrencies
} from "../actions/converter.actions";


export const converterReducers = createReducer(
  initialConverterState,
  on(setCurrencyFrom, (state, {currency}) => ({
      ...state,
      currencyFrom: currency
    })
  ),
  on(setCurrencyTo, (state, {currency}) => ({
    ...state,
    currencyTo: currency
  })),
  on(setAmount, (state, {amount}) => ({
    ...state,
    amount: amount
  })),
  on(switchCurrencies, state => ({
    ...state,
    currencyFrom: state.currencyTo,
    currencyTo: state.currencyFrom
  })),
  on(setLatestDate, (state, {date}) => ({
    ...state,
    latestDate: date
  })),
  on(calculateResult, (state, {ratesResp}) => {
      return {
        ...state,
        result: ratesResp.rates[state.currencyTo.code] * state.amount,
        latestDate: ratesResp.latestDate
      }
    }
  ),
  on(resetResult, state => {
    return {
      ...state,
      result: null
    }
  })
);

