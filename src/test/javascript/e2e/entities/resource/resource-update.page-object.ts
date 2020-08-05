import { element, by, ElementFinder } from 'protractor';

export default class ResourceUpdatePage {
  pageTitle: ElementFinder = element(by.id('crownApp.resource.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#resource-name'));
  notesInput: ElementFinder = element(by.css('input#resource-notes'));
  supplyPointResourceSelect: ElementFinder = element(by.css('select#resource-supplyPointResource'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
  }

  async supplyPointResourceSelectLastOption() {
    await this.supplyPointResourceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async supplyPointResourceSelectOption(option) {
    await this.supplyPointResourceSelect.sendKeys(option);
  }

  getSupplyPointResourceSelect() {
    return this.supplyPointResourceSelect;
  }

  async getSupplyPointResourceSelectedOption() {
    return this.supplyPointResourceSelect.element(by.css('option:checked')).getText();
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
