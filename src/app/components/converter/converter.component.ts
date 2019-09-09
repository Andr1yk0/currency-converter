import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {CurrencyService} from "../../services/currency.service";
import {MatSelectChange} from "@angular/material/select";
import {SetAmount, SetCurrencyFrom, SetCurrencyTo, SwitchCurrencies} from "../../store/actions/converter.actions";
import {selectConverterData, selectCurrencyFrom, selectCurrencyTo} from "../../store/selectors/converter.selectors";
import {ConverterState} from "../../store/state/converter.state";
import {HttpErrorResponse} from "@angular/common/http";
import {Currency} from "../../models/currency.model";
import {RatesResponse} from "../../models/rates-response.model";
import {DeleteError, SetError} from "../../store/actions/app.actions";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  result: number;
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
    this.store.pipe(select(selectConverterData)).subscribe((data: ConverterState) => {
      if (data.amount && data.currencyTo && data.currencyFrom) {
        this.currencyService.latestRates(data.currencyFrom, data.currencyTo).subscribe((res: RatesResponse) => {
          let result = res.rates[data.currencyTo.code] * data.amount;
          this.result = Math.round(result * 100) / 100;
          this.store.dispatch(new DeleteError());
        }, (response: HttpErrorResponse) => {
          this.store.dispatch(new SetError(response.error.error));
          this.result = null;
        })
      } else {
        this.result = null;
      }
    })
  }

  onSelectCurrencyFrom($event: MatSelectChange) {
    this.store.dispatch(new SetCurrencyFrom($event.value));
  }

  onSelectCurrencyTo($event: MatSelectChange) {
    this.store.dispatch(new SetCurrencyTo($event.value));
  }

  onAmountChange($event) {
    this.store.dispatch(new SetAmount(+$event.target.value));
  }

  onCurrencySwitch() {
    this.store.dispatch(new SwitchCurrencies())
  }

}
