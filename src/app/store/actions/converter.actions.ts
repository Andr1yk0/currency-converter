import {Action} from "@ngrx/store";
import {Currency} from "../../models/currency.model";

export enum EConverterActions {
  SetCurrencyFrom = '[Converter] Set CurrencyFrom',
  SetCurrencyTo = '[Converter] Set CurrencyTo',
  SetAmount = '[Converter] Set Amount',
  SwitchCurrencies = '[Converter] Switch Currencies'
}

export class SetCurrencyFrom implements Action {
  public readonly type = EConverterActions.SetCurrencyFrom;

  constructor(public payload: Currency) {
  }
}

export class SetCurrencyTo implements Action {
  public readonly type = EConverterActions.SetCurrencyTo;

  constructor(public payload: Currency) {
  }
}

export class SetAmount implements Action {
  public readonly type = EConverterActions.SetAmount;

  constructor(public payload: number) {
  }
}

export class SwitchCurrencies implements Action{
  public readonly type = EConverterActions.SwitchCurrencies
}

export type ConverterActions = SetCurrencyFrom | SetCurrencyTo | SetAmount | SwitchCurrencies;
