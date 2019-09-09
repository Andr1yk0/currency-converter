import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {selectConverterData} from "../../store/selectors/converter.selectors";
import {ConverterState} from "../../store/state/converter.state";
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  isError = false;
  message: string;
  defaultMessage = 'Select currency';
  constructor(private store: Store, private currencyService: CurrencyService) { }

  ngOnInit() {
    this.store.subscribe((data: AppState)=>{
      if(data.error){
        this.isError = true;
        this.message = data.error
      }else {
        this.isError = false;
        this.message = this.defaultMessage;
      }
    });

    this.store.pipe(select(selectConverterData)).subscribe((data: ConverterState)=>{
      if(data.currencyFrom && data.currencyTo){
        this.currencyService.getHistory(data.currencyFrom, data.currencyTo).subscribe((data)=>{
          console.log(data);
        })
      }
    })
  }

}
