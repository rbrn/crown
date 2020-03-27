import { element, by, ElementFinder } from 'protractor';

export class SupplyPointResourceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-supply-point-resource div table .btn-danger'));
  title = element.all(by.css('jhi-supply-point-resource div h2#page-heading span')).first();
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

export class SupplyPointResourceUpdatePage {
  pageTitle = element(by.id('jhi-supply-point-resource-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  numRequestedInput = element(by.id('field_numRequested'));
  canProduceInput = element(by.id('field_canProduce'));
  numinStockInput = element(by.id('field_numinStock'));

  supplyPointSelect = element(by.id('field_supplyPoint'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNumRequestedInput(numRequested: string): Promise<void> {
    await this.numRequestedInput.sendKeys(numRequested);
  }

  async getNumRequestedInput(): Promise<string> {
    return await this.numRequestedInput.getAttribute('value');
  }

  async setCanProduceInput(canProduce: string): Promise<void> {
    await this.canProduceInput.sendKeys(canProduce);
  }

  async getCanProduceInput(): Promise<string> {
    return await this.canProduceInput.getAttribute('value');
  }

  async setNuminStockInput(numinStock: string): Promise<void> {
    await this.numinStockInput.sendKeys(numinStock);
  }

  async getNuminStockInput(): Promise<string> {
    return await this.numinStockInput.getAttribute('value');
  }

  async supplyPointSelectLastOption(): Promise<void> {
    await this.supplyPointSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async supplyPointSelectOption(option: string): Promise<void> {
    await this.supplyPointSelect.sendKeys(option);
  }

  getSupplyPointSelect(): ElementFinder {
    return this.supplyPointSelect;
  }

  async getSupplyPointSelectedOption(): Promise<string> {
    return await this.supplyPointSelect.element(by.css('option:checked')).getText();
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

export class SupplyPointResourceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-supplyPointResource-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-supplyPointResource'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
