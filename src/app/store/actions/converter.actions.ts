import {createAction, props} from "@ngrx/store";
import {Currency} from "../../models/currency.model";
import {RatesResponse} from "../../models/rates-response.interface";

export const setCurrencyFrom = createAction(
  '[Converter] Set CurrencyFrom',
  props<{currency: Currency}>()
);

export const setCurrencyTo = createAction(
  '[Converter] Set CurrencyTo',
  props<{currency: Currency}>()
);

export const setAmount = createAction(
  '[Converter] Set Amount',
  props<{ amount: number }>()
);

export const switchCurrencies = createAction(
  '[Converter] Switch Currencies'
);

export const calculateResult = createAction(
  '[Converter] Calculate Result'
);

export const resetResult = createAction(
  '[Converter] Reset result'
);

export const loadRates = createAction(
  '[Converter] Load Rates'
);

export const storeRates = createAction(
  '[Converter] Store Rates',
  props<{ratesResp: RatesResponse}>()
)
