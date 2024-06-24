import { element, by, ElementFinder } from 'protractor';

export default class SupplyPointUpdatePage {
  pageTitle: ElementFinder = element(by.id('crownApp.supplyPoint.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#supply-point-name'));
  addressInput: ElementFinder = element(by.css('input#supply-point-address'));
  primaryContactNameInput: ElementFinder = element(by.css('input#supply-point-primaryContactName'));
  zipInput: ElementFinder = element(by.css('input#supply-point-zip'));
  phonenumberInput: ElementFinder = element(by.css('input#supply-point-phonenumber'));
  latxInput: ElementFinder = element(by.css('input#supply-point-latx'));
  longyInput: ElementFinder = element(by.css('input#supply-point-longy'));
  cityInput: ElementFinder = element(by.css('input#supply-point-city'));
  stateInput: ElementFinder = element(by.css('input#supply-point-state'));
  isDistributorInput: ElementFinder = element(by.css('input#supply-point-isDistributor'));
  isHealthcareInput: ElementFinder = element(by.css('input#supply-point-isHealthcare'));
  hasSterilizationInput: ElementFinder = element(by.css('input#supply-point-hasSterilization'));
  priorityInput: ElementFinder = element(by.css('input#supply-point-priority'));
  notesInput: ElementFinder = element(by.css('input#supply-point-notes'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setPrimaryContactNameInput(primaryContactName) {
    await this.primaryContactNameInput.sendKeys(primaryContactName);
  }

  async getPrimaryContactNameInput() {
    return this.primaryContactNameInput.getAttribute('value');
  }

  async setZipInput(zip) {
    await this.zipInput.sendKeys(zip);
  }

  async getZipInput() {
    return this.zipInput.getAttribute('value');
  }

  async setPhonenumberInput(phonenumber) {
    await this.phonenumberInput.sendKeys(phonenumber);
  }

  async getPhonenumberInput() {
    return this.phonenumberInput.getAttribute('value');
  }

  async setLatxInput(latx) {
    await this.latxInput.sendKeys(latx);
  }

  async getLatxInput() {
    return this.latxInput.getAttribute('value');
  }

  async setLongyInput(longy) {
    await this.longyInput.sendKeys(longy);
  }

  async getLongyInput() {
    return this.longyInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setStateInput(state) {
    await this.stateInput.sendKeys(state);
  }

  async getStateInput() {
    return this.stateInput.getAttribute('value');
  }

  getIsDistributorInput() {
    return this.isDistributorInput;
  }
  getIsHealthcareInput() {
    return this.isHealthcareInput;
  }
  getHasSterilizationInput() {
    return this.hasSterilizationInput;
  }
  async setPriorityInput(priority) {
    await this.priorityInput.sendKeys(priority);
  }

  async getPriorityInput() {
    return this.priorityInput.getAttribute('value');
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
