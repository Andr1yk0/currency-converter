import {Injectable} from "@angular/core";
import {Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import {
  calculateResult,
  loadRates,
  resetResult,
  setAmount,
  setCurrencyFrom, setCurrencyTo,
  switchCurrencies
} from "../actions/converter.actions";
import {catchError, map, mergeMap, tap, withLatestFrom} from "rxjs/operators";
import {CurrencyService} from "../../services/currency.service";
import {Action, select, Store} from "@ngrx/store";
import {selectConverterData} from "../selectors/converter.selectors";
import {RatesResponse} from "../../models/rates-response.interface";
import {EMPTY, of} from "rxjs";
import {AppState} from "../state/app.state";
import {ConverterState} from "../state/converter.state";


@Injectable()
export class ConverterEffects {

  constructor(
    private actions: Actions,
    private currencyService: CurrencyService,
    private store: Store<AppState>
  ) {
  }

  loadRates$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        loadRates,
        setCurrencyFrom,
        setAmount,
        setCurrencyTo,
        switchCurrencies
      ),
      withLatestFrom(this.store.pipe(select(selectConverterData))),
      mergeMap((data: { action: never, converterState: ConverterState }) => {
          if (data[1].amount && data[1].currencyFrom && data[1].currencyTo) {
            return this.currencyService.latestRates(data[1].currencyFrom, data[1].currencyTo)
              .pipe(
                map((ratesResponse: RatesResponse) => calculateResult({ratesResp: ratesResponse})),
                catchError(() => EMPTY)
              )
          } else {
            return of(resetResult());
          }
        }
      )
    )
  )

}
