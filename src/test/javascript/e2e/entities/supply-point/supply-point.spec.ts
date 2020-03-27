import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SupplyPointComponentsPage, SupplyPointDeleteDialog, SupplyPointUpdatePage } from './supply-point.page-object';

const expect = chai.expect;

describe('SupplyPoint e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let supplyPointComponentsPage: SupplyPointComponentsPage;
  let supplyPointUpdatePage: SupplyPointUpdatePage;
  let supplyPointDeleteDialog: SupplyPointDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SupplyPoints', async () => {
    await navBarPage.goToEntity('supply-point');
    supplyPointComponentsPage = new SupplyPointComponentsPage();
    await browser.wait(ec.visibilityOf(supplyPointComponentsPage.title), 5000);
    expect(await supplyPointComponentsPage.getTitle()).to.eq('crownApp.supplyPoint.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(supplyPointComponentsPage.entities), ec.visibilityOf(supplyPointComponentsPage.noResult)),
      1000
    );
  });

  it('should load create SupplyPoint page', async () => {
    await supplyPointComponentsPage.clickOnCreateButton();
    supplyPointUpdatePage = new SupplyPointUpdatePage();
    expect(await supplyPointUpdatePage.getPageTitle()).to.eq('crownApp.supplyPoint.home.createOrEditLabel');
    await supplyPointUpdatePage.cancel();
  });

  it('should create and save SupplyPoints', async () => {
    const nbButtonsBeforeCreate = await supplyPointComponentsPage.countDeleteButtons();

    await supplyPointComponentsPage.clickOnCreateButton();

    await promise.all([
      supplyPointUpdatePage.setNameInput('name'),
      supplyPointUpdatePage.setAddressInput('address'),
      supplyPointUpdatePage.setPrimaryContactNameInput('primaryContactName'),
      supplyPointUpdatePage.setZipInput('zip'),
      supplyPointUpdatePage.setPhonenumberInput('phonenumber'),
      supplyPointUpdatePage.setLatxInput('5'),
      supplyPointUpdatePage.setLongyInput('5'),
      supplyPointUpdatePage.setCityInput('city'),
      supplyPointUpdatePage.setStateInput('state'),
      supplyPointUpdatePage.setPriorityInput('5'),
      supplyPointUpdatePage.setNotesInput('notes')
    ]);

    expect(await supplyPointUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await supplyPointUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await supplyPointUpdatePage.getPrimaryContactNameInput()).to.eq(
      'primaryContactName',
      'Expected PrimaryContactName value to be equals to primaryContactName'
    );
    expect(await supplyPointUpdatePage.getZipInput()).to.eq('zip', 'Expected Zip value to be equals to zip');
    expect(await supplyPointUpdatePage.getPhonenumberInput()).to.eq(
      'phonenumber',
      'Expected Phonenumber value to be equals to phonenumber'
    );
    expect(await supplyPointUpdatePage.getLatxInput()).to.eq('5', 'Expected latx value to be equals to 5');
    expect(await supplyPointUpdatePage.getLongyInput()).to.eq('5', 'Expected longy value to be equals to 5');
    expect(await supplyPointUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await supplyPointUpdatePage.getStateInput()).to.eq('state', 'Expected State value to be equals to state');
    const selectedIsDistributor = supplyPointUpdatePage.getIsDistributorInput();
    if (await selectedIsDistributor.isSelected()) {
      await supplyPointUpdatePage.getIsDistributorInput().click();
      expect(await supplyPointUpdatePage.getIsDistributorInput().isSelected(), 'Expected isDistributor not to be selected').to.be.false;
    } else {
      await supplyPointUpdatePage.getIsDistributorInput().click();
      expect(await supplyPointUpdatePage.getIsDistributorInput().isSelected(), 'Expected isDistributor to be selected').to.be.true;
    }
    const selectedIsHealthcare = supplyPointUpdatePage.getIsHealthcareInput();
    if (await selectedIsHealthcare.isSelected()) {
      await supplyPointUpdatePage.getIsHealthcareInput().click();
      expect(await supplyPointUpdatePage.getIsHealthcareInput().isSelected(), 'Expected isHealthcare not to be selected').to.be.false;
    } else {
      await supplyPointUpdatePage.getIsHealthcareInput().click();
      expect(await supplyPointUpdatePage.getIsHealthcareInput().isSelected(), 'Expected isHealthcare to be selected').to.be.true;
    }
    const selectedHasSterilization = supplyPointUpdatePage.getHasSterilizationInput();
    if (await selectedHasSterilization.isSelected()) {
      await supplyPointUpdatePage.getHasSterilizationInput().click();
      expect(await supplyPointUpdatePage.getHasSterilizationInput().isSelected(), 'Expected hasSterilization not to be selected').to.be
        .false;
    } else {
      await supplyPointUpdatePage.getHasSterilizationInput().click();
      expect(await supplyPointUpdatePage.getHasSterilizationInput().isSelected(), 'Expected hasSterilization to be selected').to.be.true;
    }
    expect(await supplyPointUpdatePage.getPriorityInput()).to.eq('5', 'Expected priority value to be equals to 5');
    expect(await supplyPointUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');

    await supplyPointUpdatePage.save();
    expect(await supplyPointUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await supplyPointComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SupplyPoint', async () => {
    const nbButtonsBeforeDelete = await supplyPointComponentsPage.countDeleteButtons();
    await supplyPointComponentsPage.clickOnLastDeleteButton();

    supplyPointDeleteDialog = new SupplyPointDeleteDialog();
    expect(await supplyPointDeleteDialog.getDialogTitle()).to.eq('crownApp.supplyPoint.delete.question');
    await supplyPointDeleteDialog.clickOnConfirmButton();

    expect(await supplyPointComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
