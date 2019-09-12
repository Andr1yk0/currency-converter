import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  calculateResult, loadRates,
  resetResult,
  storeRates,
} from "../actions/converter.actions";
import {catchError, concat, map, mergeMap, withLatestFrom} from "rxjs/operators";
import {CurrencyService} from "../../services/currency.service";
import {select, Store} from "@ngrx/store";
import {RatesResponse} from "../../models/rates-response.interface";
import {EMPTY, of} from "rxjs";
import {AppState} from "../state/app.state";
import {selectConverter} from "../selectors/converter.selectors";
import {HttpErrorResponse} from "@angular/common/http";
import {deleteError, setError} from "../actions/app.actions";


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
      ofType(loadRates),
      withLatestFrom(this.store.pipe(select(selectConverter))),
      mergeMap((data) => {
          let [action, converterState] = data;
          if (converterState.currencyFrom && converterState.currencyTo) {
            return this.currencyService.latestRates(converterState.currencyFrom, converterState.currencyTo)
              .pipe(
                mergeMap((ratesResponse: RatesResponse) =>
                  [
                    storeRates({ratesResp: ratesResponse}),
                    calculateResult(),
                    deleteError()
                  ]
                ),
                catchError((err: HttpErrorResponse) => of(setError({error: err.error.error})))
              )
          } else {
            return of(resetResult());
          }
        }
      )
    )
  );

}
