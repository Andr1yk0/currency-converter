import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {selectConverterData} from "../../store/selectors/converter.selectors";
import {ConverterState} from "../../store/state/converter.state";
import {CurrencyService} from "../../services/currency.service";
import {Chart} from "chart.js";
import {HistoryResponse} from "../../models/history-response.interface"

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  chart;
  isError = false;
  message: string;
  defaultMessage = 'Select currency';
  dateFrom:string;
  dateTo:string;
  chartDataLabel;
  chartData = [];
  chartLabels = [];
  @ViewChild('chartCanvas', {static: false}) chartCanvas: ElementRef;

  constructor(private store: Store<AppState>, private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.store.subscribe((data: AppState) => {
      if (data.error) {
        this.isError = true;
        this.message = data.error
      } else {
        this.isError = false;
        this.message = this.defaultMessage;
      }
    });

    this.store.pipe(select(selectConverterData)).subscribe((converterState: ConverterState) => {
      if (converterState.currencyFrom && converterState.currencyTo) {
        this.currencyService.getHistory(converterState.currencyFrom, converterState.currencyTo).subscribe((data: HistoryResponse) => {
          this.chartLabels = Object.keys(data.rates);
          this.chartLabels.sort();

          this.chartDataLabel = `${converterState.currencyFrom.code}/${converterState.currencyTo.code} rate`;
          this.chartData = [];
          this.chartLabels.forEach((date) => {
            this.chartData.push({x: date, y: data.rates[date][converterState.currencyTo.code]})
          });
          this.makeChart();
        })
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
                parser: 'YYYY-MM-DD',
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

  onDateFromChange(event)
  {
    console.log(event.value)
  }

}
