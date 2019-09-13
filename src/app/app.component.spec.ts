import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {provideMockStore} from "@ngrx/store/testing";
import {initialAppState} from "./store/state/app.state";
import {createSelector} from "@ngrx/store";
import {initialConverterState} from "./store/state/converter.state";
import {StoreMockConfig} from "./store.mock";

describe('AppComponent', () => {
  const selectConverter = createSelector(
    ()=>1,
    state => 1
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        // provideMockStore(StoreMockConfig)
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'converter'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('converter');
  });

});
