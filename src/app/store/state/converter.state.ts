import {Currency} from "../../models/currency.model";

export interface ConverterState {
  currencyFrom: Currency,
  currencyTo: Currency,
  amount: number,
  latestDate: string
}

export const initialConverterState: ConverterState = {
  currencyFrom: null,
  currencyTo: null,
  amount: null,
  latestDate: null
};
