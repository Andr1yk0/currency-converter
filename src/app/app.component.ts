import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "./store/state/app.state";
import {CurrencyService} from "./services/currency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'converter';
  constructor(private store: Store<AppState>, private currencyService: CurrencyService) {
  }

  ngOnInit(): void {

  }
}
