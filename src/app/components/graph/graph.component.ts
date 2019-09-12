import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {CurrencyService} from "../../services/currency.service";
import {Chart} from "chart.js";
import {loadHistory, setDateFrom, setDateTo} from "../../store/actions/graph.actions";
import {
  selectGraphDateFrom,
  selectGraphDateTo,
  selectGraphRatesHistory
} from "../../store/selectors/graph.selectors";
import {environment} from "../../../environments/environment";
import {combineLatest, Observable, of, Subscription} from "rxjs";
import {selectCurrencyFrom, selectCurrencyTo} from "../../store/selectors/converter.selectors";
import {Currency} from "../../models/currency.model";
import {filter, map, withLatestFrom} from "rxjs/operators";
import * as moment from 'moment'
import {selectError} from "../../store/selectors/app.selectors";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {

  displayChart = false;
  chart;
  defaultMessage = 'Select currency';
  error$ = this.store.pipe(select(selectError), filter(val => val != null));
  dateFrom$ = this.store.pipe(select(selectGraphDateFrom));
  dateTo$ = this.store.pipe(select(selectGraphDateTo));
  dateFromMin$ = this.dateFrom$.pipe(map(date => moment(date).add(1, 'day').format(environment.dateFormat)))
  chartDataLabel;
  chartData = [];
  chartLabels = [];
  subscription: Subscription;
  errorSub: Subscription;
  @ViewChild('chartCanvas', {static: false}) chartCanvas: ElementRef;

  constructor(
    private store: Store<AppState>,
    private currencyService: CurrencyService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(selectGraphRatesHistory))
      .pipe(
        withLatestFrom(
          this.store.pipe(select(selectCurrencyFrom)),
          this.store.pipe(select(selectCurrencyTo))
        ),
        filter(
          (data: [Object, Currency, Currency]) => data.every(el => el != null)
        )
      ).subscribe((data: [Object, Currency, Currency]) => {
        let [ratesHistory, currencyFrom, currencyTo] = data;
        this.chartLabels = Object.keys(ratesHistory);
        this.chartLabels.sort();
        this.chartDataLabel = `${currencyFrom.code}/${currencyTo.code} rate`;
        this.chartData = [];
        this.chartLabels.forEach((date) => {
          this.chartData.push({x: date, y: ratesHistory[date][currencyTo.code]})
        });
        this.displayChart = true;
        this.changeDetectorRef.detectChanges();
        this.makeChart();
      });
    this.errorSub = this.error$.subscribe((message: string)=>{
      if(message){
        this.displayChart = false;
      }
    })

  }

  makeChart() {
    let ctx = this.chartCanvas.nativeElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: this.chartDataLabel,
            data: this.chartData,
            fill: false,
            pointRadius: 0,
            borderColor: '#673AB7',
            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                parser: environment.dateFormat,
                unit: 'month',
                displayFormats: {
                  'month': 'DD MMM YYYY'
                }
              },

            }
          ]
        }
      }
    })
  }

  onDateFromChange(event) {
    this.store.dispatch(setDateFrom({date: this.formatDate(event.value)}));
    this.store.dispatch(loadHistory())
  }

  onDateToChange(event) {
    this.store.dispatch(setDateTo({date: this.formatDate(event.value)}));
    this.store.dispatch(loadHistory())
  }

  private formatDate(moment) {
    return moment.format(environment.dateFormat)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
