import {Currency} from "../../models/currency.model";

export interface ConverterState {
  currencyFrom: Currency,
  currencyTo: Currency,
  amount: number,
  latestDate: string
}

export const initialConverterState: ConverterState = {
  currencyFrom: {code: 'USD'},
  currencyTo: {code: 'GBP'},
  amount: null,
  latestDate: null
};
