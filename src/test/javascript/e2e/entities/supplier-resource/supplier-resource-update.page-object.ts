import { element, by, ElementFinder } from 'protractor';

export default class SupplierResourceUpdatePage {
  pageTitle: ElementFinder = element(by.id('crownApp.supplierResource.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quantityInput: ElementFinder = element(by.css('input#supplier-resource-quantity'));
  costInput: ElementFinder = element(by.css('input#supplier-resource-cost'));
  resourceTypeSelect: ElementFinder = element(by.css('select#supplier-resource-resourceType'));
  supplierSelect: ElementFinder = element(by.css('select#supplier-resource-supplier'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  async setCostInput(cost) {
    await this.costInput.sendKeys(cost);
  }

  async getCostInput() {
    return this.costInput.getAttribute('value');
  }

  async resourceTypeSelectLastOption() {
    await this.resourceTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async resourceTypeSelectOption(option) {
    await this.resourceTypeSelect.sendKeys(option);
  }

  getResourceTypeSelect() {
    return this.resourceTypeSelect;
  }

  async getResourceTypeSelectedOption() {
    return this.resourceTypeSelect.element(by.css('option:checked')).getText();
  }

  async supplierSelectLastOption() {
    await this.supplierSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async supplierSelectOption(option) {
    await this.supplierSelect.sendKeys(option);
  }

  getSupplierSelect() {
    return this.supplierSelect;
  }

  async getSupplierSelectedOption() {
    return this.supplierSelect.element(by.css('option:checked')).getText();
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
