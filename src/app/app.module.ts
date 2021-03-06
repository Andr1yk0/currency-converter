import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers} from './store/reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from "@angular/common/http";
import { ConverterComponent } from './components/converter/converter.component';
import { GraphComponent } from './components/graph/graph.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormsModule} from "@angular/forms";
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment} from 'moment';
import {ConverterEffects} from "./store/effects/converter.effects";
import {GraphEffects} from "./store/effects/graph.effects";
import {environment} from "../environments/environment";
const moment = _rollupMoment || _moment;
const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: environment.dateFormat,
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    EffectsModule.forRoot([ConverterEffects, GraphEffects]),
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatMomentDateModule
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
    {provide: DateAdapter, useClass: MomentDateAdapter},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
