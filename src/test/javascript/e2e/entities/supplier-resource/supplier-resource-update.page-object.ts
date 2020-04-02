import { element, by, ElementFinder } from 'protractor';

export default class SupplierResourceUpdatePage {
  pageTitle: ElementFinder = element(by.id('crownApp.supplierResource.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quantityInput: ElementFinder = element(by.css('input#supplier-resource-quantity'));
  costInput: ElementFinder = element(by.css('input#supplier-resource-cost'));

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
