import { element, by, ElementFinder } from 'protractor';

export default class RequestUpdatePage {
  pageTitle: ElementFinder = element(by.id('crownApp.request.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  itemTypeInput: ElementFinder = element(by.css('input#request-itemType'));
  numRequestedInput: ElementFinder = element(by.css('input#request-numRequested'));
  dailyNeedInput: ElementFinder = element(by.css('input#request-dailyNeed'));
  numinStockInput: ElementFinder = element(by.css('input#request-numinStock'));
  daysLeftInput: ElementFinder = element(by.css('input#request-daysLeft'));
  resourceSelect: ElementFinder = element(by.css('select#request-resource'));
  requestPointSelect: ElementFinder = element(by.css('select#request-requestPoint'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setItemTypeInput(itemType) {
    await this.itemTypeInput.sendKeys(itemType);
  }

  async getItemTypeInput() {
    return this.itemTypeInput.getAttribute('value');
  }

  async setNumRequestedInput(numRequested) {
    await this.numRequestedInput.sendKeys(numRequested);
  }

  async getNumRequestedInput() {
    return this.numRequestedInput.getAttribute('value');
  }

  async setDailyNeedInput(dailyNeed) {
    await this.dailyNeedInput.sendKeys(dailyNeed);
  }

  async getDailyNeedInput() {
    return this.dailyNeedInput.getAttribute('value');
  }

  async setNuminStockInput(numinStock) {
    await this.numinStockInput.sendKeys(numinStock);
  }

  async getNuminStockInput() {
    return this.numinStockInput.getAttribute('value');
  }

  async setDaysLeftInput(daysLeft) {
    await this.daysLeftInput.sendKeys(daysLeft);
  }

  async getDaysLeftInput() {
    return this.daysLeftInput.getAttribute('value');
  }

  async resourceSelectLastOption() {
    await this.resourceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async resourceSelectOption(option) {
    await this.resourceSelect.sendKeys(option);
  }

  getResourceSelect() {
    return this.resourceSelect;
  }

  async getResourceSelectedOption() {
    return this.resourceSelect.element(by.css('option:checked')).getText();
  }

  async requestPointSelectLastOption() {
    await this.requestPointSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async requestPointSelectOption(option) {
    await this.requestPointSelect.sendKeys(option);
  }

  getRequestPointSelect() {
    return this.requestPointSelect;
  }

  async getRequestPointSelectedOption() {
    return this.requestPointSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
