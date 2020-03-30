import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RequestComponentsPage, { RequestDeleteDialog } from './request.page-object';
import RequestUpdatePage from './request-update.page-object';
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

describe('Request e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let requestComponentsPage: RequestComponentsPage;
  let requestUpdatePage: RequestUpdatePage;
  let requestDeleteDialog: RequestDeleteDialog;
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

  it('should load Requests', async () => {
    await navBarPage.getEntityPage('request');
    requestComponentsPage = new RequestComponentsPage();
    expect(await requestComponentsPage.title.getText()).to.match(/Requests/);

    expect(await requestComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([requestComponentsPage.noRecords, requestComponentsPage.table]);

    beforeRecordsCount = (await isVisible(requestComponentsPage.noRecords)) ? 0 : await getRecordsCount(requestComponentsPage.table);
  });

  it('should load create Request page', async () => {
    await requestComponentsPage.createButton.click();
    requestUpdatePage = new RequestUpdatePage();
    expect(await requestUpdatePage.getPageTitle().getAttribute('id')).to.match(/crownApp.request.home.createOrEditLabel/);
    await requestUpdatePage.cancel();
  });

  it('should create and save Requests', async () => {
    await requestComponentsPage.createButton.click();
    await requestUpdatePage.setItemTypeInput('itemType');
    expect(await requestUpdatePage.getItemTypeInput()).to.match(/itemType/);
    await requestUpdatePage.setNumRequestedInput('5');
    expect(await requestUpdatePage.getNumRequestedInput()).to.eq('5');
    await requestUpdatePage.setDailyNeedInput('5');
    expect(await requestUpdatePage.getDailyNeedInput()).to.eq('5');
    await requestUpdatePage.setNuminStockInput('5');
    expect(await requestUpdatePage.getNuminStockInput()).to.eq('5');
    await requestUpdatePage.setDaysLeftInput('5');
    expect(await requestUpdatePage.getDaysLeftInput()).to.eq('5');
    await requestUpdatePage.requestPointSelectLastOption();
    await waitUntilDisplayed(requestUpdatePage.saveButton);
    await requestUpdatePage.save();
    await waitUntilHidden(requestUpdatePage.saveButton);
    expect(await isVisible(requestUpdatePage.saveButton)).to.be.false;

    expect(await requestComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(requestComponentsPage.table);

    await waitUntilCount(requestComponentsPage.records, beforeRecordsCount + 1);
    expect(await requestComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Request', async () => {
    const deleteButton = requestComponentsPage.getDeleteButton(requestComponentsPage.records.last());
    await click(deleteButton);

    requestDeleteDialog = new RequestDeleteDialog();
    await waitUntilDisplayed(requestDeleteDialog.deleteModal);
    expect(await requestDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/crownApp.request.delete.question/);
    await requestDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(requestDeleteDialog.deleteModal);

    expect(await isVisible(requestDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([requestComponentsPage.noRecords, requestComponentsPage.table]);

    const afterCount = (await isVisible(requestComponentsPage.noRecords)) ? 0 : await getRecordsCount(requestComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
