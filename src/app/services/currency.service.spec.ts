import {CurrencyService} from "./currency.service";
import {Currency} from "../models/currency.model";
import {asyncData} from "../testing/helpers";

describe("CurrencyService", () => {
  let httpSpy: { get: jasmine.Spy };
  let currencyService: CurrencyService;
  const baseUrl = 'https://api.exchangeratesapi.io/';

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    currencyService = new CurrencyService(<any>httpSpy)
  });

  it('should return expected latest rates', () => {
    const expectedRates = {date: 'now', rates: {'USD': 1}};
    const expectedArg = `${baseUrl}latest?symbols=eur&base=usd`;
    httpSpy.get.withArgs(expectedArg).and.returnValue(asyncData(expectedRates));

    currencyService.latestRates(new Currency('usd'), new Currency('eur'))
      .subscribe(rates => expect(rates).toEqual(expectedRates), fail);

    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should return expected rates history', ()=>{
    const currencyFrom = new Currency('usd');
    const currencyTo = new Currency('eur');
    const dateFrom = '2012-01-01';
    const dateTo = '2013-01-01';

    const expectedHistory = {history: 'expected'};
    const expectedArg = `${baseUrl}history?start_at=${dateFrom}&end_at=${dateTo}&base=${currencyFrom.code}&symbols=${currencyTo.code}`;

    httpSpy.get.withArgs(expectedArg).and.returnValue(asyncData(expectedHistory));
    currencyService.getHistory(currencyFrom,currencyTo,dateFrom,dateTo).subscribe(
      history => expect(history).toEqual(expectedHistory),
      fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  })
});
