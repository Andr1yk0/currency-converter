import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getGraph(){
    return element(by.css('.chart canvas'))
  }

  getDefaultMessage(){
    return element(by.css('.graph-message .message span')).getText() as Promise<string>
  }

  getCurrencySelectFrom(){
    return element(by.id('selectCurrencyFrom'))
  }

  getCurrencySelectTo(){
    return element(by.id('selectCurrencyTo'));
  }

  getSelectOptions(){
    return element.all(by.css('mat-option'))
  }

  getOptionByText(text: string){
    return element(by.cssContainingText('.mat-option-text', text));
  }

  getSelectFromText(){
    return this.getCurrencySelectFrom().element(by.css('.mat-select-value-text span')).getText()
  }

  getSelectToText(){
    return this.getCurrencySelectTo().element(by.css('.mat-select-value-text span')).getText()
  }

  getCurrencySwitchBtn(){
    return element(by.id('switchBtn'))
  }
}
