import { element, by, ElementFinder } from 'protractor';

export class SupplyPointComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-supply-point div table .btn-danger'));
  title = element.all(by.css('jhi-supply-point div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class SupplyPointUpdatePage {
  pageTitle = element(by.id('jhi-supply-point-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  addressInput = element(by.id('field_address'));
  primaryContactNameInput = element(by.id('field_primaryContactName'));
  zipInput = element(by.id('field_zip'));
  phonenumberInput = element(by.id('field_phonenumber'));
  latxInput = element(by.id('field_latx'));
  longyInput = element(by.id('field_longy'));
  cityInput = element(by.id('field_city'));
  stateInput = element(by.id('field_state'));
  isDistributorInput = element(by.id('field_isDistributor'));
  isHealthcareInput = element(by.id('field_isHealthcare'));
  hasSterilizationInput = element(by.id('field_hasSterilization'));
  priorityInput = element(by.id('field_priority'));
  notesInput = element(by.id('field_notes'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setAddressInput(address: string): Promise<void> {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput(): Promise<string> {
    return await this.addressInput.getAttribute('value');
  }

  async setPrimaryContactNameInput(primaryContactName: string): Promise<void> {
    await this.primaryContactNameInput.sendKeys(primaryContactName);
  }

  async getPrimaryContactNameInput(): Promise<string> {
    return await this.primaryContactNameInput.getAttribute('value');
  }

  async setZipInput(zip: string): Promise<void> {
    await this.zipInput.sendKeys(zip);
  }

  async getZipInput(): Promise<string> {
    return await this.zipInput.getAttribute('value');
  }

  async setPhonenumberInput(phonenumber: string): Promise<void> {
    await this.phonenumberInput.sendKeys(phonenumber);
  }

  async getPhonenumberInput(): Promise<string> {
    return await this.phonenumberInput.getAttribute('value');
  }

  async setLatxInput(latx: string): Promise<void> {
    await this.latxInput.sendKeys(latx);
  }

  async getLatxInput(): Promise<string> {
    return await this.latxInput.getAttribute('value');
  }

  async setLongyInput(longy: string): Promise<void> {
    await this.longyInput.sendKeys(longy);
  }

  async getLongyInput(): Promise<string> {
    return await this.longyInput.getAttribute('value');
  }

  async setCityInput(city: string): Promise<void> {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput(): Promise<string> {
    return await this.cityInput.getAttribute('value');
  }

  async setStateInput(state: string): Promise<void> {
    await this.stateInput.sendKeys(state);
  }

  async getStateInput(): Promise<string> {
    return await this.stateInput.getAttribute('value');
  }

  getIsDistributorInput(): ElementFinder {
    return this.isDistributorInput;
  }

  getIsHealthcareInput(): ElementFinder {
    return this.isHealthcareInput;
  }

  getHasSterilizationInput(): ElementFinder {
    return this.hasSterilizationInput;
  }

  async setPriorityInput(priority: string): Promise<void> {
    await this.priorityInput.sendKeys(priority);
  }

  async getPriorityInput(): Promise<string> {
    return await this.priorityInput.getAttribute('value');
  }

  async setNotesInput(notes: string): Promise<void> {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput(): Promise<string> {
    return await this.notesInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class SupplyPointDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-supplyPoint-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-supplyPoint'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
