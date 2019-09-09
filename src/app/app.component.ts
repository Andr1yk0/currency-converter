import {Component, OnInit} from '@angular/core';
import {Currency} from "./models/currency.model";
import {select, Store} from "@ngrx/store";
import {AppState} from "./store/state/app.state";
import {MatSelectChange} from "@angular/material/select";
import {SetAmount, SetCurrencyFrom, SetCurrencyTo} from "./store/actions/converter.actions";
import {selectConverterData} from "./store/selectors/converter.selectors";
import {ConverterState} from "./store/state/converter.state";
import {CurrencyService} from "./services/currency.service";
import {HttpErrorResponse} from "@angular/common/http";

enum MessageTypes {
  Info = 'info',
  Error = 'error'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'converter';
  isError = false;
  defaultMessage = 'Select currencies and amount to exchange';
  message: string;
  result:number;


  constructor(private store: Store<AppState>, private currencyService: CurrencyService) {

  }

  ngOnInit(): void {

  }


}
