import { element, by, ElementFinder } from 'protractor';

export default class DeliveryUpdatePage {
  pageTitle: ElementFinder = element(by.id('crownApp.delivery.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  deliveryContactInput: ElementFinder = element(by.css('input#delivery-deliveryContact'));
  phoneNumberInput: ElementFinder = element(by.css('input#delivery-phoneNumber'));
  notesInput: ElementFinder = element(by.css('input#delivery-notes'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDeliveryContactInput(deliveryContact) {
    await this.deliveryContactInput.sendKeys(deliveryContact);
  }

  async getDeliveryContactInput() {
    return this.deliveryContactInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
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
