import {AppPage} from './app.po';
import {browser, by, logging, protractor} from 'protractor';
import * as moment from "moment";

describe('Currency Converter App', () => {
  let page: AppPage;
  let EC;

  beforeEach(() => {
    page = new AppPage();
    EC = protractor.ExpectedConditions;
  });

  it('should display default message', () => {
    page.navigateTo();
    expect(page.getDefaultMessage()).toEqual('Select currency');
  });

  it('should remove selected currency option from opposite select', () => {
    const selectFrom = page.getCurrencySelectFrom();
    const selectTo = page.getCurrencySelectTo();

    selectFrom.click();
    expect(page.getSelectOptions().count()).toBe(3);
    page.getOptionByText('USD').click();
    browser.wait(() => page.getSelectOptions().count().then((count) => {
      return count === 0
    }), 500);
    expect(page.getSelectOptions().count()).toBe(0);

    selectTo.click();
    expect(page.getSelectOptions().count()).toBe(2);
    expect(page.getOptionByText('USD').isPresent()).toBeFalsy()
  });

  it('should display chart after currencies selected', () => {
    expect(page.getGraph().isPresent()).toBeFalsy();
    page.getOptionByText('EUR').click();
    browser.wait(EC.visibilityOf(page.getGraph()), 1000, 'Chart failed to load after timeout');
  });

  it('should switch between two currencies', () => {
    expect(page.getSelectFromText()).toEqual('USD');
    expect(page.getSelectToText()).toEqual('EUR');

    page.getCurrencySwitchBtn().click();

    expect(page.getSelectFromText()).toEqual('EUR');
    expect(page.getSelectToText()).toEqual('USD');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
