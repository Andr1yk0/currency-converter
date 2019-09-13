import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConverterComponent} from './converter.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MemoizedSelector, Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {StoreMockConfig} from "../../store.mock";
import {By} from "@angular/platform-browser";
import {
  calculateResult,
  loadRates,
  setAmount,
  setCurrencyFrom,
  switchCurrencies
} from "../../store/actions/converter.actions";
import {Currency} from "../../models/currency.model";
import {selectCurrenciesFrom} from "../../store/selectors/converter.selectors";

describe('ConverterComponent', () => {
  let component: ConverterComponent;
  let fixture: ComponentFixture<ConverterComponent>;
  let store: MockStore<AppState>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConverterComponent],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        provideMockStore(StoreMockConfig)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get<Store<AppState>>(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable switch button before currencies selected', () => {
    const btn = fixture.debugElement.query(By.css('#switchBtn')).nativeElement;
    expect(btn.disabled).toBeTruthy()
  });

  it('dispatch actions when amount changes', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const amountInput = (<HTMLInputElement><any>fixture.debugElement.query(By.css('[placeholder="Amount"]')).nativeElement);
    const amountValue = '2';

    amountInput.value = amountValue;
    amountInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(
      setAmount({amount: +amountValue})
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      calculateResult()
    )
  });

  it('dispatch actions on currency changed', async(() => {
    const trigger = fixture.debugElement.query(By.css('#selectCurrencyFrom .mat-select-trigger')).nativeElement;
    trigger.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const dispatchSpy = spyOn(store, 'dispatch');
      let optionText = fixture.debugElement.query(By.css('.mat-option-text')).nativeElement;
      optionText.click();
      fixture.detectChanges();
      fixture.whenStable().then(()=>{
        expect(dispatchSpy).toHaveBeenCalledTimes(2);
        expect(dispatchSpy).toHaveBeenCalledWith(
          setCurrencyFrom({currency: new Currency('USD')})
        )
      })
    });
  }),
  );

  it('dispatch actions on switch button click', async(() => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const button = fixture.debugElement.query(By.css('#switchBtn')).nativeElement;
    button.disabled = false;
    fixture.detectChanges();
    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(switchCurrencies());
    expect(dispatchSpy).toHaveBeenCalledWith(loadRates())
  }))

});
