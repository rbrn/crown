import { element, by, ElementFinder } from 'protractor';

export default class SupplyPointUpdatePage {
  pageTitle: ElementFinder = element(by.id('crownApp.supplyPoint.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#supply-point-name'));
  addressInput: ElementFinder = element(by.css('input#supply-point-address'));
  primaryContactNameInput: ElementFinder = element(by.css('input#supply-point-primaryContactName'));
  zipInput: ElementFinder = element(by.css('input#supply-point-zip'));
  phoneNumberInput: ElementFinder = element(by.css('input#supply-point-phoneNumber'));
  latitudeInput: ElementFinder = element(by.css('input#supply-point-latitude'));
  longitudeInput: ElementFinder = element(by.css('input#supply-point-longitude'));
  cityInput: ElementFinder = element(by.css('input#supply-point-city'));
  stateInput: ElementFinder = element(by.css('input#supply-point-state'));
  emailInput: ElementFinder = element(by.css('input#supply-point-email'));
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

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setLatitudeInput(latitude) {
    await this.latitudeInput.sendKeys(latitude);
  }

  async getLatitudeInput() {
    return this.latitudeInput.getAttribute('value');
  }

  async setLongitudeInput(longitude) {
    await this.longitudeInput.sendKeys(longitude);
  }

  async getLongitudeInput() {
    return this.longitudeInput.getAttribute('value');
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

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
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
