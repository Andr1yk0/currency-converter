import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GraphComponent} from './graph.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {initialAppState} from "../../store/state/app.state";
import {Store, StoreModule} from "@ngrx/store";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {provideMockStore} from "@ngrx/store/testing";
import {selectConverter} from "../../store/selectors/converter.selectors";
import {initialConverterState} from "../../store/state/converter.state";
import {selectError} from "../../store/selectors/app.selectors";
import {StoreMockConfig} from "../../store.mock";
import {By} from "@angular/platform-browser";

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphComponent],
      imports: [
        MatFormFieldModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        HttpClientModule
      ],
      providers: [
        provideMockStore(StoreMockConfig)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default message', ()=>{
    const el = fixture.debugElement.query(By.css('.message span')).nativeElement;
    expect(el.textContent).toEqual(component.defaultMessage);
  })
});
