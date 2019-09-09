export class RatesResponse {
  constructor(
    public rates: Object,
    public date: string,
    public base: string
  ) {}
}
