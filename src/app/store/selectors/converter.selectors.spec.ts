import {selectCurrenciesTo, selectCurrencyTo} from "./converter.selectors";
import {initialConverterState} from "../state/converter.state";
import {Currency} from "../../models/currency.model";

describe('Converter selectors', () => {
  it('selects currencies without selected currency from', () => {
    let state = initialConverterState;
    let currencies = [
      new Currency('usd'),
      new Currency('uah')
    ];
    state.currencyFrom = currencies[0];
    state.currencies = currencies;
    const expectedCurrencies = currencies.filter(
      currency => currency.code !== state.currencyFrom.code
    );

    expect(selectCurrenciesTo.projector(state)).toEqual(expectedCurrencies)
  })
});
