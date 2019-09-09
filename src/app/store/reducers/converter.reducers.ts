import {ConverterState, initialConverterState} from "../state/converter.state";
import {ConverterActions, EConverterActions} from "../actions/converter.actions";

export const converterReducers = (state = initialConverterState, action: ConverterActions): ConverterState => {
  switch (action.type) {
    case EConverterActions.SetCurrencyFrom: {
      return {
        ...state,
        currencyFrom: action.payload
      };
    }
    case EConverterActions.SetCurrencyTo: {
      return {
        ...state,
        currencyTo: action.payload
      }
    }
    case EConverterActions.SetAmount: {
      return {
        ...state,
        amount: action.payload
      }
    }
    case EConverterActions.SwitchCurrencies: {
      return {
        ...state,
        currencyTo: state.currencyFrom,
        currencyFrom: state.currencyTo
      }
    }
    default:
      return state;
  }
};
