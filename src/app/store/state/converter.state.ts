import {Currency} from "../../models/currency.model";

export interface ConverterState {
  currencies: Currency[]
  currencyFrom: Currency,
  currencyTo: Currency,
  amount: number,
  latestDate: string,
  result: number,
  rate: number
}

export const initialConverterState: ConverterState = {
  currencies: [
    new Currency('USD'),
    new Currency('EUR'),
    new Currency('GBP')
  ],
  currencyFrom: null,
  currencyTo: null,
  amount: null,
  latestDate: null,
  result: null,
  rate: null
};
