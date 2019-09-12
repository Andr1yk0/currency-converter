import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Currency} from "../models/currency.model";

@Injectable({
  providedIn: "root"
})
export class CurrencyService {
  private url = 'https://api.exchangeratesapi.io/';

  constructor(private http: HttpClient) {
  }

  latestRates(currencyFrom: Currency, currencyTo: Currency) {
    return this.http.get(`${this.url}latest?symbols=${currencyTo.code}&base=${currencyFrom.code}`)
  }

  getHistory(currencyFrom: Currency, currencyTo: Currency, dateFrom: string, dateTo:string) {
    return this.http.get(`${this.url}history?start_at=${dateFrom}&end_at=${dateTo}&base=${currencyFrom.code}&symbols=${currencyTo.code}`)
  }

}
