import {initialConverterState} from "../state/converter.state";
import {createReducer, on} from "@ngrx/store";
import {
  calculateResult, resetResult,
  setAmount,
  setCurrencyFrom, setCurrencyTo, storeRates, switchCurrencies
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
  on(calculateResult, state => {
      let result = state.rate * state.amount;
      return {
        ...state,
        result: Math.round(result * 100) / 100,
      }
    }
  ),
  on(resetResult, state => {
    return {
      ...state,
      result: null
    }
  }),
  on(storeRates, (state, {ratesResp}) => {
    return {
      ...state,
      rate: ratesResp.rates[state.currencyTo.code],
      latestDate: ratesResp.date
    }
  })
);

