import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {MatSelectChange} from "@angular/material/select";
import {
  calculateResult, loadRates,
  setAmount,
  setCurrencyFrom,
  setCurrencyTo,
  switchCurrencies,
} from "../../store/actions/converter.actions";
import {
  getCurrencies,
  selectCurrenciesFrom, selectCurrenciesTo,
  selectCurrencyFrom,
  selectCurrencyTo,
  selectResult
} from "../../store/selectors/converter.selectors";


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent{

  result = this.store.pipe(select(selectResult));
  currencyFrom$ = this.store.pipe(select(selectCurrencyFrom));
  currencyTo$ = this.store.pipe(select(selectCurrencyTo));
  currenciesFrom$ = this.store.pipe(select(selectCurrenciesFrom));
  currenciesTo$ = this.store.pipe(select(selectCurrenciesTo));

  constructor(private store: Store<AppState>) {
  }

  onSelectCurrencyFrom($event: MatSelectChange) {
    this.store.dispatch(setCurrencyFrom({currency: $event.value}));
    this.store.dispatch(loadRates())
  }

  onSelectCurrencyTo($event: MatSelectChange) {
    this.store.dispatch(setCurrencyTo({currency: $event.value}));
    this.store.dispatch(loadRates())
  }

  onAmountChange($event) {
    this.store.dispatch(setAmount({amount: +$event.target.value}));
    this.store.dispatch(calculateResult());
  }

  onCurrencySwitch() {
    this.store.dispatch(switchCurrencies());
    this.store.dispatch(loadRates())
  }

}
