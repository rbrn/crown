import { element, by, ElementFinder } from 'protractor';

export default class RecieverResourceUpdatePage {
  pageTitle: ElementFinder = element(by.id('crownApp.recieverResource.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#reciever-resource-name'));
  quantityInput: ElementFinder = element(by.css('input#reciever-resource-quantity'));
  dailyUseInput: ElementFinder = element(by.css('input#reciever-resource-dailyUse'));
  currentStockInput: ElementFinder = element(by.css('input#reciever-resource-currentStock'));
  notesInput: ElementFinder = element(by.css('input#reciever-resource-notes'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  async setDailyUseInput(dailyUse) {
    await this.dailyUseInput.sendKeys(dailyUse);
  }

  async getDailyUseInput() {
    return this.dailyUseInput.getAttribute('value');
  }

  async setCurrentStockInput(currentStock) {
    await this.currentStockInput.sendKeys(currentStock);
  }

  async getCurrentStockInput() {
    return this.currentStockInput.getAttribute('value');
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
