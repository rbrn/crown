import { element, by, ElementFinder } from 'protractor';

export default class SupplyPointResourceUpdatePage {
  pageTitle: ElementFinder = element(by.id('crownApp.supplyPointResource.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  numRequestedInput: ElementFinder = element(by.css('input#supply-point-resource-numRequested'));
  canProduceInput: ElementFinder = element(by.css('input#supply-point-resource-canProduce'));
  numinStockInput: ElementFinder = element(by.css('input#supply-point-resource-numinStock'));
  supplypointSelect: ElementFinder = element(by.css('select#supply-point-resource-supplypoint'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNumRequestedInput(numRequested) {
    await this.numRequestedInput.sendKeys(numRequested);
  }

  async getNumRequestedInput() {
    return this.numRequestedInput.getAttribute('value');
  }

  async setCanProduceInput(canProduce) {
    await this.canProduceInput.sendKeys(canProduce);
  }

  async getCanProduceInput() {
    return this.canProduceInput.getAttribute('value');
  }

  async setNuminStockInput(numinStock) {
    await this.numinStockInput.sendKeys(numinStock);
  }

  async getNuminStockInput() {
    return this.numinStockInput.getAttribute('value');
  }

  async supplypointSelectLastOption() {
    await this.supplypointSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async supplypointSelectOption(option) {
    await this.supplypointSelect.sendKeys(option);
  }

  getSupplypointSelect() {
    return this.supplypointSelect;
  }

  async getSupplypointSelectedOption() {
    return this.supplypointSelect.element(by.css('option:checked')).getText();
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
