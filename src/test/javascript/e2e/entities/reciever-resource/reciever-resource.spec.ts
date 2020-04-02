import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RecieverResourceComponentsPage, { RecieverResourceDeleteDialog } from './reciever-resource.page-object';
import RecieverResourceUpdatePage from './reciever-resource-update.page-object';
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

describe('RecieverResource e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recieverResourceComponentsPage: RecieverResourceComponentsPage;
  let recieverResourceUpdatePage: RecieverResourceUpdatePage;
  let recieverResourceDeleteDialog: RecieverResourceDeleteDialog;
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

  it('should load RecieverResources', async () => {
    await navBarPage.getEntityPage('reciever-resource');
    recieverResourceComponentsPage = new RecieverResourceComponentsPage();
    expect(await recieverResourceComponentsPage.title.getText()).to.match(/Reciever Resources/);

    expect(await recieverResourceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([recieverResourceComponentsPage.noRecords, recieverResourceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(recieverResourceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(recieverResourceComponentsPage.table);
  });

  it('should load create RecieverResource page', async () => {
    await recieverResourceComponentsPage.createButton.click();
    recieverResourceUpdatePage = new RecieverResourceUpdatePage();
    expect(await recieverResourceUpdatePage.getPageTitle().getAttribute('id')).to.match(/crownApp.recieverResource.home.createOrEditLabel/);
    await recieverResourceUpdatePage.cancel();
  });

  it('should create and save RecieverResources', async () => {
    await recieverResourceComponentsPage.createButton.click();
    await recieverResourceUpdatePage.setNameInput('name');
    expect(await recieverResourceUpdatePage.getNameInput()).to.match(/name/);
    await recieverResourceUpdatePage.setQuantityInput('5');
    expect(await recieverResourceUpdatePage.getQuantityInput()).to.eq('5');
    await recieverResourceUpdatePage.setDailyUseInput('5');
    expect(await recieverResourceUpdatePage.getDailyUseInput()).to.eq('5');
    await recieverResourceUpdatePage.setCurrentStockInput('5');
    expect(await recieverResourceUpdatePage.getCurrentStockInput()).to.eq('5');
    await recieverResourceUpdatePage.setNotesInput('notes');
    expect(await recieverResourceUpdatePage.getNotesInput()).to.match(/notes/);
    await waitUntilDisplayed(recieverResourceUpdatePage.saveButton);
    await recieverResourceUpdatePage.save();
    await waitUntilHidden(recieverResourceUpdatePage.saveButton);
    expect(await isVisible(recieverResourceUpdatePage.saveButton)).to.be.false;

    expect(await recieverResourceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(recieverResourceComponentsPage.table);

    await waitUntilCount(recieverResourceComponentsPage.records, beforeRecordsCount + 1);
    expect(await recieverResourceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last RecieverResource', async () => {
    const deleteButton = recieverResourceComponentsPage.getDeleteButton(recieverResourceComponentsPage.records.last());
    await click(deleteButton);

    recieverResourceDeleteDialog = new RecieverResourceDeleteDialog();
    await waitUntilDisplayed(recieverResourceDeleteDialog.deleteModal);
    expect(await recieverResourceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/crownApp.recieverResource.delete.question/);
    await recieverResourceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(recieverResourceDeleteDialog.deleteModal);

    expect(await isVisible(recieverResourceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([recieverResourceComponentsPage.noRecords, recieverResourceComponentsPage.table]);

    const afterCount = (await isVisible(recieverResourceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(recieverResourceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
