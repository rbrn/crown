import { element, by, ElementFinder } from 'protractor';

export default class ClaimUpdatePage {
  pageTitle: ElementFinder = element(by.id('crownApp.claim.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quantityInput: ElementFinder = element(by.css('input#claim-quantity'));
  notesInput: ElementFinder = element(by.css('input#claim-notes'));
  statusSelect: ElementFinder = element(by.css('select#claim-status'));
  receiverResourceSelect: ElementFinder = element(by.css('select#claim-receiverResource'));
  supplierResourceSelect: ElementFinder = element(by.css('select#claim-supplierResource'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async receiverResourceSelectLastOption() {
    await this.receiverResourceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async receiverResourceSelectOption(option) {
    await this.receiverResourceSelect.sendKeys(option);
  }

  getReceiverResourceSelect() {
    return this.receiverResourceSelect;
  }

  async getReceiverResourceSelectedOption() {
    return this.receiverResourceSelect.element(by.css('option:checked')).getText();
  }

  async supplierResourceSelectLastOption() {
    await this.supplierResourceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async supplierResourceSelectOption(option) {
    await this.supplierResourceSelect.sendKeys(option);
  }

  getSupplierResourceSelect() {
    return this.supplierResourceSelect;
  }

  async getSupplierResourceSelectedOption() {
    return this.supplierResourceSelect.element(by.css('option:checked')).getText();
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
