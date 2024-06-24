import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ResourceComponentsPage, { ResourceDeleteDialog } from './resource.page-object';
import ResourceUpdatePage from './resource-update.page-object';
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

describe('Resource e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let resourceComponentsPage: ResourceComponentsPage;
  let resourceUpdatePage: ResourceUpdatePage;
  let resourceDeleteDialog: ResourceDeleteDialog;
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

  it('should load Resources', async () => {
    await navBarPage.getEntityPage('resource');
    resourceComponentsPage = new ResourceComponentsPage();
    expect(await resourceComponentsPage.title.getText()).to.match(/Resources/);

    expect(await resourceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([resourceComponentsPage.noRecords, resourceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(resourceComponentsPage.noRecords)) ? 0 : await getRecordsCount(resourceComponentsPage.table);
  });

  it('should load create Resource page', async () => {
    await resourceComponentsPage.createButton.click();
    resourceUpdatePage = new ResourceUpdatePage();
    expect(await resourceUpdatePage.getPageTitle().getAttribute('id')).to.match(/crownApp.resource.home.createOrEditLabel/);
    await resourceUpdatePage.cancel();
  });

  it('should create and save Resources', async () => {
    await resourceComponentsPage.createButton.click();
    await resourceUpdatePage.setNameInput('name');
    expect(await resourceUpdatePage.getNameInput()).to.match(/name/);
    await resourceUpdatePage.setNotesInput('notes');
    expect(await resourceUpdatePage.getNotesInput()).to.match(/notes/);
    await resourceUpdatePage.supplyPointResourceSelectLastOption();
    await waitUntilDisplayed(resourceUpdatePage.saveButton);
    await resourceUpdatePage.save();
    await waitUntilHidden(resourceUpdatePage.saveButton);
    expect(await isVisible(resourceUpdatePage.saveButton)).to.be.false;

    expect(await resourceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(resourceComponentsPage.table);

    await waitUntilCount(resourceComponentsPage.records, beforeRecordsCount + 1);
    expect(await resourceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Resource', async () => {
    const deleteButton = resourceComponentsPage.getDeleteButton(resourceComponentsPage.records.last());
    await click(deleteButton);

    resourceDeleteDialog = new ResourceDeleteDialog();
    await waitUntilDisplayed(resourceDeleteDialog.deleteModal);
    expect(await resourceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/crownApp.resource.delete.question/);
    await resourceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(resourceDeleteDialog.deleteModal);

    expect(await isVisible(resourceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([resourceComponentsPage.noRecords, resourceComponentsPage.table]);

    const afterCount = (await isVisible(resourceComponentsPage.noRecords)) ? 0 : await getRecordsCount(resourceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
