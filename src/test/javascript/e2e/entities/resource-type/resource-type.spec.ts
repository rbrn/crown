import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ResourceTypeComponentsPage, { ResourceTypeDeleteDialog } from './resource-type.page-object';
import ResourceTypeUpdatePage from './resource-type-update.page-object';
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

describe('ResourceType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let resourceTypeComponentsPage: ResourceTypeComponentsPage;
  let resourceTypeUpdatePage: ResourceTypeUpdatePage;
  let resourceTypeDeleteDialog: ResourceTypeDeleteDialog;
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

  it('should load ResourceTypes', async () => {
    await navBarPage.getEntityPage('resource-type');
    resourceTypeComponentsPage = new ResourceTypeComponentsPage();
    expect(await resourceTypeComponentsPage.title.getText()).to.match(/Resource Types/);

    expect(await resourceTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([resourceTypeComponentsPage.noRecords, resourceTypeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(resourceTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(resourceTypeComponentsPage.table);
  });

  it('should load create ResourceType page', async () => {
    await resourceTypeComponentsPage.createButton.click();
    resourceTypeUpdatePage = new ResourceTypeUpdatePage();
    expect(await resourceTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/crownApp.resourceType.home.createOrEditLabel/);
    await resourceTypeUpdatePage.cancel();
  });

  it('should create and save ResourceTypes', async () => {
    await resourceTypeComponentsPage.createButton.click();
    await resourceTypeUpdatePage.setNameInput('name');
    expect(await resourceTypeUpdatePage.getNameInput()).to.match(/name/);
    await resourceTypeUpdatePage.setNotesInput('notes');
    expect(await resourceTypeUpdatePage.getNotesInput()).to.match(/notes/);
    await waitUntilDisplayed(resourceTypeUpdatePage.saveButton);
    await resourceTypeUpdatePage.save();
    await waitUntilHidden(resourceTypeUpdatePage.saveButton);
    expect(await isVisible(resourceTypeUpdatePage.saveButton)).to.be.false;

    expect(await resourceTypeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(resourceTypeComponentsPage.table);

    await waitUntilCount(resourceTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await resourceTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ResourceType', async () => {
    const deleteButton = resourceTypeComponentsPage.getDeleteButton(resourceTypeComponentsPage.records.last());
    await click(deleteButton);

    resourceTypeDeleteDialog = new ResourceTypeDeleteDialog();
    await waitUntilDisplayed(resourceTypeDeleteDialog.deleteModal);
    expect(await resourceTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/crownApp.resourceType.delete.question/);
    await resourceTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(resourceTypeDeleteDialog.deleteModal);

    expect(await isVisible(resourceTypeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([resourceTypeComponentsPage.noRecords, resourceTypeComponentsPage.table]);

    const afterCount = (await isVisible(resourceTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(resourceTypeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
