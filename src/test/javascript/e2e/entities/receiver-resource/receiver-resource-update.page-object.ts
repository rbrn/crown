import { element, by, ElementFinder } from 'protractor';

export default class ReceiverResourceUpdatePage {
  pageTitle: ElementFinder = element(by.id('crownApp.receiverResource.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#receiver-resource-name'));
  quantityInput: ElementFinder = element(by.css('input#receiver-resource-quantity'));
  dailyUseInput: ElementFinder = element(by.css('input#receiver-resource-dailyUse'));
  currentStockInput: ElementFinder = element(by.css('input#receiver-resource-currentStock'));
  notesInput: ElementFinder = element(by.css('input#receiver-resource-notes'));
  resourceTypeSelect: ElementFinder = element(by.css('select#receiver-resource-resourceType'));
  receiverSelect: ElementFinder = element(by.css('select#receiver-resource-receiver'));

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

  async receiverSelectLastOption() {
    await this.receiverSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async receiverSelectOption(option) {
    await this.receiverSelect.sendKeys(option);
  }

  getReceiverSelect() {
    return this.receiverSelect;
  }

  async getReceiverSelectedOption() {
    return this.receiverSelect.element(by.css('option:checked')).getText();
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
