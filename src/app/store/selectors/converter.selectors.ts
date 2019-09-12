import {AppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {ConverterState} from "../state/converter.state";
import {Currency} from "../../models/currency.model";

export const selectConverter = (state: AppState) => state.converter;

export const selectCurrencyFrom = createSelector(
  selectConverter,
  (state: ConverterState) => state.currencyFrom
);

export const selectCurrencyTo = createSelector(
  selectConverter,
  (state: ConverterState) => state.currencyTo
);

export const selectResult = createSelector(
  selectConverter,
  (state: ConverterState) => state.result
);

export const selectCurrenciesTo = createSelector(
  selectConverter,
  (state: ConverterState) => {
    return state.currencies.filter((currency: Currency) => {
      if (state.currencyFrom) {
        return currency.code !== state.currencyFrom.code
      }
      return true;
    })
  });

export const selectCurrenciesFrom = createSelector(
  selectConverter,
  (state: ConverterState) => {
    return state.currencies.filter((currency: Currency) => {
      if (state.currencyTo) {
        return currency.code !== state.currencyTo.code
      }
      return true;
    })
  }
);
