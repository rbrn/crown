import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SupplyPointComponentsPage, { SupplyPointDeleteDialog } from './supply-point.page-object';
import SupplyPointUpdatePage from './supply-point-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../util/utils';

const expect = chai.expect;

describe('SupplyPoint e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let supplyPointComponentsPage: SupplyPointComponentsPage;
  let supplyPointUpdatePage: SupplyPointUpdatePage;
  let supplyPointDeleteDialog: SupplyPointDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load SupplyPoints', async () => {
    await navBarPage.getEntityPage('supply-point');
    supplyPointComponentsPage = new SupplyPointComponentsPage();
    expect(await supplyPointComponentsPage.title.getText()).to.match(/Supply Points/);

    expect(await supplyPointComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([supplyPointComponentsPage.noRecords, supplyPointComponentsPage.table]);

    beforeRecordsCount = (await isVisible(supplyPointComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(supplyPointComponentsPage.table);
  });

  it('should load create SupplyPoint page', async () => {
    await supplyPointComponentsPage.createButton.click();
    supplyPointUpdatePage = new SupplyPointUpdatePage();
    expect(await supplyPointUpdatePage.getPageTitle().getAttribute('id')).to.match(/crownApp.supplyPoint.home.createOrEditLabel/);
    await supplyPointUpdatePage.cancel();
  });

  it('should create and save SupplyPoints', async () => {
    await supplyPointComponentsPage.createButton.click();
    await supplyPointUpdatePage.setNameInput('name');
    expect(await supplyPointUpdatePage.getNameInput()).to.match(/name/);
    await supplyPointUpdatePage.setAddressInput('address');
    expect(await supplyPointUpdatePage.getAddressInput()).to.match(/address/);
    await supplyPointUpdatePage.setPrimaryContactNameInput('primaryContactName');
    expect(await supplyPointUpdatePage.getPrimaryContactNameInput()).to.match(/primaryContactName/);
    await supplyPointUpdatePage.setZipInput('zip');
    expect(await supplyPointUpdatePage.getZipInput()).to.match(/zip/);
    await supplyPointUpdatePage.setPhonenumberInput('phonenumber');
    expect(await supplyPointUpdatePage.getPhonenumberInput()).to.match(/phonenumber/);
    await supplyPointUpdatePage.setLatxInput('5');
    expect(await supplyPointUpdatePage.getLatxInput()).to.eq('5');
    await supplyPointUpdatePage.setLongyInput('5');
    expect(await supplyPointUpdatePage.getLongyInput()).to.eq('5');
    await supplyPointUpdatePage.setCityInput('city');
    expect(await supplyPointUpdatePage.getCityInput()).to.match(/city/);
    await supplyPointUpdatePage.setStateInput('state');
    expect(await supplyPointUpdatePage.getStateInput()).to.match(/state/);
    const selectedIsDistributor = await supplyPointUpdatePage.getIsDistributorInput().isSelected();
    if (selectedIsDistributor) {
      await supplyPointUpdatePage.getIsDistributorInput().click();
      expect(await supplyPointUpdatePage.getIsDistributorInput().isSelected()).to.be.false;
    } else {
      await supplyPointUpdatePage.getIsDistributorInput().click();
      expect(await supplyPointUpdatePage.getIsDistributorInput().isSelected()).to.be.true;
    }
    const selectedIsHealthcare = await supplyPointUpdatePage.getIsHealthcareInput().isSelected();
    if (selectedIsHealthcare) {
      await supplyPointUpdatePage.getIsHealthcareInput().click();
      expect(await supplyPointUpdatePage.getIsHealthcareInput().isSelected()).to.be.false;
    } else {
      await supplyPointUpdatePage.getIsHealthcareInput().click();
      expect(await supplyPointUpdatePage.getIsHealthcareInput().isSelected()).to.be.true;
    }
    const selectedHasSterilization = await supplyPointUpdatePage.getHasSterilizationInput().isSelected();
    if (selectedHasSterilization) {
      await supplyPointUpdatePage.getHasSterilizationInput().click();
      expect(await supplyPointUpdatePage.getHasSterilizationInput().isSelected()).to.be.false;
    } else {
      await supplyPointUpdatePage.getHasSterilizationInput().click();
      expect(await supplyPointUpdatePage.getHasSterilizationInput().isSelected()).to.be.true;
    }
    await supplyPointUpdatePage.setPriorityInput('5');
    expect(await supplyPointUpdatePage.getPriorityInput()).to.eq('5');
    await supplyPointUpdatePage.setNotesInput('notes');
    expect(await supplyPointUpdatePage.getNotesInput()).to.match(/notes/);
    await waitUntilDisplayed(supplyPointUpdatePage.saveButton);
    await supplyPointUpdatePage.save();
    await waitUntilHidden(supplyPointUpdatePage.saveButton);
    expect(await isVisible(supplyPointUpdatePage.saveButton)).to.be.false;

    expect(await supplyPointComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(supplyPointComponentsPage.table);

    await waitUntilCount(supplyPointComponentsPage.records, beforeRecordsCount + 1);
    expect(await supplyPointComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last SupplyPoint', async () => {
    const deleteButton = supplyPointComponentsPage.getDeleteButton(supplyPointComponentsPage.records.last());
    await click(deleteButton);

    supplyPointDeleteDialog = new SupplyPointDeleteDialog();
    await waitUntilDisplayed(supplyPointDeleteDialog.deleteModal);
    expect(await supplyPointDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/crownApp.supplyPoint.delete.question/);
    await supplyPointDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(supplyPointDeleteDialog.deleteModal);

    expect(await isVisible(supplyPointDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([supplyPointComponentsPage.noRecords, supplyPointComponentsPage.table]);

    const afterCount = (await isVisible(supplyPointComponentsPage.noRecords)) ? 0 : await getRecordsCount(supplyPointComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
