import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {CurrencyService} from "../../services/currency.service";
import {MatSelectChange} from "@angular/material/select";
import {
  loadRates,
  setAmount,
  setCurrencyFrom,
  setCurrencyTo,
  switchCurrencies,
} from "../../store/actions/converter.actions";
import {
  selectConverterData,
  selectCurrencyFrom,
  selectCurrencyTo,
  selectResult
} from "../../store/selectors/converter.selectors";
import {ConverterState} from "../../store/state/converter.state";
import {HttpErrorResponse} from "@angular/common/http";
import {Currency} from "../../models/currency.model";
import {RatesResponse} from "../../models/rates-response.interface";
import {DeleteError, SetError} from "../../store/actions/app.actions";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  result = this.store.pipe(select(selectResult));
  currencyFrom$ = this.store.pipe(select(selectCurrencyFrom));
  currencyTo$ = this.store.pipe(select(selectCurrencyTo));
  currencies: Currency[] = [
    new Currency('USD'),
    new Currency('EUR'),
    new Currency('GBP')
  ];

  constructor(private store: Store<AppState>, private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.store.dispatch(loadRates());
  }

  onSelectCurrencyFrom($event: MatSelectChange) {
    this.store.dispatch(setCurrencyFrom({currency: $event.value}));
  }

  onSelectCurrencyTo($event: MatSelectChange) {
    this.store.dispatch(setCurrencyTo({currency: $event.value}));
  }

  onAmountChange($event) {
    this.store.dispatch(setAmount({amount: +$event.target.value}));
  }

  onCurrencySwitch() {
    this.store.dispatch(switchCurrencies())
  }

}
