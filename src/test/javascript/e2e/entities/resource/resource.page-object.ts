import { element, by, ElementFinder } from 'protractor';

export class ResourceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-resource div table .btn-danger'));
  title = element.all(by.css('jhi-resource div h2#page-heading span')).first();
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

export class ResourceUpdatePage {
  pageTitle = element(by.id('jhi-resource-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  notesInput = element(by.id('field_notes'));

  supplyPointResourceSelect = element(by.id('field_supplyPointResource'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setNotesInput(notes: string): Promise<void> {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput(): Promise<string> {
    return await this.notesInput.getAttribute('value');
  }

  async supplyPointResourceSelectLastOption(): Promise<void> {
    await this.supplyPointResourceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async supplyPointResourceSelectOption(option: string): Promise<void> {
    await this.supplyPointResourceSelect.sendKeys(option);
  }

  getSupplyPointResourceSelect(): ElementFinder {
    return this.supplyPointResourceSelect;
  }

  async getSupplyPointResourceSelectedOption(): Promise<string> {
    return await this.supplyPointResourceSelect.element(by.css('option:checked')).getText();
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

export class ResourceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-resource-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-resource'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
