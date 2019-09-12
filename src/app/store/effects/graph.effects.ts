import {CurrencyService} from "../../services/currency.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AppState} from "../state/app.state";
import {select, Store} from "@ngrx/store";
import {storeRates,} from "../actions/converter.actions";
import {catchError, map, mergeMap, withLatestFrom} from "rxjs/operators";
import {selectConverter} from "../selectors/converter.selectors";
import {EMPTY, of} from "rxjs";
import {HistoryResponse} from "../../models/history-response.interface";
import {loadHistory, setDateFrom, setDateTo, setRatesHistory} from "../actions/graph.actions";
import {selectGraph} from "../selectors/graph.selectors";
import * as moment from "moment";
import {environment} from "../../../environments/environment";
import {deleteError} from "../actions/app.actions";

export class GraphEffects {
  constructor(
    private actions: Actions,
    private currencyService: CurrencyService,
    private store: Store<AppState>
  ) {
  }

  loadHistory$ = createEffect(() => this.actions.pipe(
    ofType(
      storeRates,
      loadHistory
    ),
    withLatestFrom(
      this.store.pipe(select(selectConverter)),
      this.store.pipe(select(selectGraph))
    ),
    mergeMap((data) => {
      let [action, converterState, graphState] = data;
      if (converterState.currencyFrom && converterState.currencyTo && converterState.latestDate) {
        let dateTo = graphState.dateTo ? graphState.dateTo : converterState.latestDate;
        let dateFrom = graphState.dateFrom ? graphState.dateFrom :
          moment(dateTo).subtract(6, 'months').format(environment.dateFormat);

        return this.currencyService.getHistory(
          converterState.currencyFrom,
          converterState.currencyTo,
          dateFrom,
          dateTo
        ).pipe(
          mergeMap((historyResp: HistoryResponse) => [
              setRatesHistory({history: historyResp.rates}),
              setDateFrom({date: historyResp.start_at}),
              setDateTo({date: historyResp.end_at}),
              deleteError()
            ]
          ),
          catchError(() => EMPTY)
        )
      } else {
        return of(setRatesHistory({history: null}))
      }
    })
  ))
}
