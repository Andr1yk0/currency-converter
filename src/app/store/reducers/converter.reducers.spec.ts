import {converterReducers} from "./converter.reducers";
import {ConverterState, initialConverterState} from "../state/converter.state";
import {calculateResult, setCurrencyFrom} from "../actions/converter.actions";
import {Currency} from "../../models/currency.model";

describe('Converter reducers', ()=>{
  it('set currency from', ()=>{
    const currency = new Currency('uah');
    const res = converterReducers(initialConverterState, setCurrencyFrom({currency: currency}));

    expect(res.currencyFrom).toBe(currency);
  });

  it('calculate result based on rate and amount', ()=>{
    let state = initialConverterState;
    state.amount = 3;
    state.rate = 1.2;
    let expectedResult = Math.round(state.amount * state.rate * 100)/100;
    const res = converterReducers(state, calculateResult());

    expect(res.result).toBe(expectedResult)
  })

});
