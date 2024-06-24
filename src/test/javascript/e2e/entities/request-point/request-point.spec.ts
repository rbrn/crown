import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RequestPointComponentsPage, { RequestPointDeleteDialog } from './request-point.page-object';
import RequestPointUpdatePage from './request-point-update.page-object';
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

describe('RequestPoint e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let requestPointComponentsPage: RequestPointComponentsPage;
  let requestPointUpdatePage: RequestPointUpdatePage;
  let requestPointDeleteDialog: RequestPointDeleteDialog;
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

  it('should load RequestPoints', async () => {
    await navBarPage.getEntityPage('request-point');
    requestPointComponentsPage = new RequestPointComponentsPage();
    expect(await requestPointComponentsPage.title.getText()).to.match(/Request Points/);

    expect(await requestPointComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([requestPointComponentsPage.noRecords, requestPointComponentsPage.table]);

    beforeRecordsCount = (await isVisible(requestPointComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(requestPointComponentsPage.table);
  });

  it('should load create RequestPoint page', async () => {
    await requestPointComponentsPage.createButton.click();
    requestPointUpdatePage = new RequestPointUpdatePage();
    expect(await requestPointUpdatePage.getPageTitle().getAttribute('id')).to.match(/crownApp.requestPoint.home.createOrEditLabel/);
    await requestPointUpdatePage.cancel();
  });

  it('should create and save RequestPoints', async () => {
    await requestPointComponentsPage.createButton.click();
    await requestPointUpdatePage.setNameInput('name');
    expect(await requestPointUpdatePage.getNameInput()).to.match(/name/);
    await requestPointUpdatePage.setAddressInput('address');
    expect(await requestPointUpdatePage.getAddressInput()).to.match(/address/);
    await requestPointUpdatePage.setPrimaryContactNameInput('primaryContactName');
    expect(await requestPointUpdatePage.getPrimaryContactNameInput()).to.match(/primaryContactName/);
    await requestPointUpdatePage.setZipInput('zip');
    expect(await requestPointUpdatePage.getZipInput()).to.match(/zip/);
    await requestPointUpdatePage.setPhonenumberInput('phonenumber');
    expect(await requestPointUpdatePage.getPhonenumberInput()).to.match(/phonenumber/);
    await requestPointUpdatePage.setLatxInput('5');
    expect(await requestPointUpdatePage.getLatxInput()).to.eq('5');
    await requestPointUpdatePage.setLongyInput('5');
    expect(await requestPointUpdatePage.getLongyInput()).to.eq('5');
    await requestPointUpdatePage.setCityInput('city');
    expect(await requestPointUpdatePage.getCityInput()).to.match(/city/);
    await requestPointUpdatePage.setStateInput('state');
    expect(await requestPointUpdatePage.getStateInput()).to.match(/state/);
    const selectedIsDistributor = await requestPointUpdatePage.getIsDistributorInput().isSelected();
    if (selectedIsDistributor) {
      await requestPointUpdatePage.getIsDistributorInput().click();
      expect(await requestPointUpdatePage.getIsDistributorInput().isSelected()).to.be.false;
    } else {
      await requestPointUpdatePage.getIsDistributorInput().click();
      expect(await requestPointUpdatePage.getIsDistributorInput().isSelected()).to.be.true;
    }
    const selectedIsHealthcare = await requestPointUpdatePage.getIsHealthcareInput().isSelected();
    if (selectedIsHealthcare) {
      await requestPointUpdatePage.getIsHealthcareInput().click();
      expect(await requestPointUpdatePage.getIsHealthcareInput().isSelected()).to.be.false;
    } else {
      await requestPointUpdatePage.getIsHealthcareInput().click();
      expect(await requestPointUpdatePage.getIsHealthcareInput().isSelected()).to.be.true;
    }
    const selectedHasSterilization = await requestPointUpdatePage.getHasSterilizationInput().isSelected();
    if (selectedHasSterilization) {
      await requestPointUpdatePage.getHasSterilizationInput().click();
      expect(await requestPointUpdatePage.getHasSterilizationInput().isSelected()).to.be.false;
    } else {
      await requestPointUpdatePage.getHasSterilizationInput().click();
      expect(await requestPointUpdatePage.getHasSterilizationInput().isSelected()).to.be.true;
    }
    await requestPointUpdatePage.setPriorityInput('5');
    expect(await requestPointUpdatePage.getPriorityInput()).to.eq('5');
    await requestPointUpdatePage.setNotesInput('notes');
    expect(await requestPointUpdatePage.getNotesInput()).to.match(/notes/);
    await waitUntilDisplayed(requestPointUpdatePage.saveButton);
    await requestPointUpdatePage.save();
    await waitUntilHidden(requestPointUpdatePage.saveButton);
    expect(await isVisible(requestPointUpdatePage.saveButton)).to.be.false;

    expect(await requestPointComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(requestPointComponentsPage.table);

    await waitUntilCount(requestPointComponentsPage.records, beforeRecordsCount + 1);
    expect(await requestPointComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last RequestPoint', async () => {
    const deleteButton = requestPointComponentsPage.getDeleteButton(requestPointComponentsPage.records.last());
    await click(deleteButton);

    requestPointDeleteDialog = new RequestPointDeleteDialog();
    await waitUntilDisplayed(requestPointDeleteDialog.deleteModal);
    expect(await requestPointDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/crownApp.requestPoint.delete.question/);
    await requestPointDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(requestPointDeleteDialog.deleteModal);

    expect(await isVisible(requestPointDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([requestPointComponentsPage.noRecords, requestPointComponentsPage.table]);

    const afterCount = (await isVisible(requestPointComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(requestPointComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
