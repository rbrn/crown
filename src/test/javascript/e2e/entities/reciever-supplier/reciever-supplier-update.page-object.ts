import { element, by, ElementFinder } from 'protractor';

export default class RecieverSupplierUpdatePage {
  pageTitle: ElementFinder = element(by.id('crownApp.recieverSupplier.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#reciever-supplier-name'));
  addressInput: ElementFinder = element(by.css('input#reciever-supplier-address'));
  emailInput: ElementFinder = element(by.css('input#reciever-supplier-email'));
  primaryContactNameInput: ElementFinder = element(by.css('input#reciever-supplier-primaryContactName'));
  zipInput: ElementFinder = element(by.css('input#reciever-supplier-zip'));
  phonenumberInput: ElementFinder = element(by.css('input#reciever-supplier-phonenumber'));
  latxInput: ElementFinder = element(by.css('input#reciever-supplier-latx'));
  longyInput: ElementFinder = element(by.css('input#reciever-supplier-longy'));
  cityInput: ElementFinder = element(by.css('input#reciever-supplier-city'));
  stateInput: ElementFinder = element(by.css('input#reciever-supplier-state'));
  countryInput: ElementFinder = element(by.css('input#reciever-supplier-country'));
  npiInput: ElementFinder = element(by.css('input#reciever-supplier-npi'));
  isReceiverInput: ElementFinder = element(by.css('input#reciever-supplier-isReceiver'));
  isSupplierInput: ElementFinder = element(by.css('input#reciever-supplier-isSupplier'));
  hasSterilizationInput: ElementFinder = element(by.css('input#reciever-supplier-hasSterilization'));
  priorityInput: ElementFinder = element(by.css('input#reciever-supplier-priority'));
  notesInput: ElementFinder = element(by.css('input#reciever-supplier-notes'));

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

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
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

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return this.countryInput.getAttribute('value');
  }

  async setNpiInput(npi) {
    await this.npiInput.sendKeys(npi);
  }

  async getNpiInput() {
    return this.npiInput.getAttribute('value');
  }

  getIsReceiverInput() {
    return this.isReceiverInput;
  }
  getIsSupplierInput() {
    return this.isSupplierInput;
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
