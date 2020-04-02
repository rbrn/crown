import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ReceiverResourceComponentsPage, { ReceiverResourceDeleteDialog } from './receiver-resource.page-object';
import ReceiverResourceUpdatePage from './receiver-resource-update.page-object';
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

describe('ReceiverResource e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let receiverResourceComponentsPage: ReceiverResourceComponentsPage;
  let receiverResourceUpdatePage: ReceiverResourceUpdatePage;
  let receiverResourceDeleteDialog: ReceiverResourceDeleteDialog;
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

  it('should load ReceiverResources', async () => {
    await navBarPage.getEntityPage('receiver-resource');
    receiverResourceComponentsPage = new ReceiverResourceComponentsPage();
    expect(await receiverResourceComponentsPage.title.getText()).to.match(/Receiver Resources/);

    expect(await receiverResourceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([receiverResourceComponentsPage.noRecords, receiverResourceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(receiverResourceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(receiverResourceComponentsPage.table);
  });

  it('should load create ReceiverResource page', async () => {
    await receiverResourceComponentsPage.createButton.click();
    receiverResourceUpdatePage = new ReceiverResourceUpdatePage();
    expect(await receiverResourceUpdatePage.getPageTitle().getAttribute('id')).to.match(/crownApp.receiverResource.home.createOrEditLabel/);
    await receiverResourceUpdatePage.cancel();
  });

  it('should create and save ReceiverResources', async () => {
    await receiverResourceComponentsPage.createButton.click();
    await receiverResourceUpdatePage.setNameInput('name');
    expect(await receiverResourceUpdatePage.getNameInput()).to.match(/name/);
    await receiverResourceUpdatePage.setQuantityInput('5');
    expect(await receiverResourceUpdatePage.getQuantityInput()).to.eq('5');
    await receiverResourceUpdatePage.setDailyUseInput('5');
    expect(await receiverResourceUpdatePage.getDailyUseInput()).to.eq('5');
    await receiverResourceUpdatePage.setCurrentStockInput('5');
    expect(await receiverResourceUpdatePage.getCurrentStockInput()).to.eq('5');
    await receiverResourceUpdatePage.setNotesInput('notes');
    expect(await receiverResourceUpdatePage.getNotesInput()).to.match(/notes/);
    await waitUntilDisplayed(receiverResourceUpdatePage.saveButton);
    await receiverResourceUpdatePage.save();
    await waitUntilHidden(receiverResourceUpdatePage.saveButton);
    expect(await isVisible(receiverResourceUpdatePage.saveButton)).to.be.false;

    expect(await receiverResourceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(receiverResourceComponentsPage.table);

    await waitUntilCount(receiverResourceComponentsPage.records, beforeRecordsCount + 1);
    expect(await receiverResourceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ReceiverResource', async () => {
    const deleteButton = receiverResourceComponentsPage.getDeleteButton(receiverResourceComponentsPage.records.last());
    await click(deleteButton);

    receiverResourceDeleteDialog = new ReceiverResourceDeleteDialog();
    await waitUntilDisplayed(receiverResourceDeleteDialog.deleteModal);
    expect(await receiverResourceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/crownApp.receiverResource.delete.question/);
    await receiverResourceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(receiverResourceDeleteDialog.deleteModal);

    expect(await isVisible(receiverResourceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([receiverResourceComponentsPage.noRecords, receiverResourceComponentsPage.table]);

    const afterCount = (await isVisible(receiverResourceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(receiverResourceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
