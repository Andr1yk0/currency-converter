import {createAction, props} from "@ngrx/store";
import {Currency} from "../../models/currency.model";
import {RatesResponse} from "../../models/rates-response.interface";

export enum EConverterActions {
  SetCurrencyFrom = '[Converter] Set CurrencyFrom',
  SetCurrencyTo = '[Converter] Set CurrencyTo',
  SetAmount = '[Converter] Set Amount',
  SetLatestDate = '[Converter] Set Latest Date',
  SwitchCurrencies = '[Converter] Switch Currencies',
  LoadRates = '[Converter] Load Currency rates'
}

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

export const setLatestDate = createAction(
  '[Converter] Set Latest Date',
  props<{ date: string }>()
);

export const loadRates = createAction(
  '[Converter] Load Currency rates'
);

export const calculateResult = createAction(
  '[Converter] Calculate Result',
  props<{ ratesResp: RatesResponse }>()
);

export const resetResult = createAction(
  '[Converter] Reset result'
);
