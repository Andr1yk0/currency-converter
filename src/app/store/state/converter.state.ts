import {Currency} from "../../models/currency.model";

export interface ConverterState {
  currencyFrom: Currency,
  currencyTo: Currency,
  amount: number,
  latestDate: string,
  result: number
}

export const initialConverterState: ConverterState = {
  currencyFrom: null,
  currencyTo: null,
  amount: null,
  latestDate: null,
  result: null
};
