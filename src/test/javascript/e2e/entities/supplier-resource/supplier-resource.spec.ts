import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SupplierResourceComponentsPage, { SupplierResourceDeleteDialog } from './supplier-resource.page-object';
import SupplierResourceUpdatePage from './supplier-resource-update.page-object';
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

describe('SupplierResource e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let supplierResourceComponentsPage: SupplierResourceComponentsPage;
  let supplierResourceUpdatePage: SupplierResourceUpdatePage;
  let supplierResourceDeleteDialog: SupplierResourceDeleteDialog;
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

  it('should load SupplierResources', async () => {
    await navBarPage.getEntityPage('supplier-resource');
    supplierResourceComponentsPage = new SupplierResourceComponentsPage();
    expect(await supplierResourceComponentsPage.title.getText()).to.match(/Supplier Resources/);

    expect(await supplierResourceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([supplierResourceComponentsPage.noRecords, supplierResourceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(supplierResourceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(supplierResourceComponentsPage.table);
  });

  it('should load create SupplierResource page', async () => {
    await supplierResourceComponentsPage.createButton.click();
    supplierResourceUpdatePage = new SupplierResourceUpdatePage();
    expect(await supplierResourceUpdatePage.getPageTitle().getAttribute('id')).to.match(/crownApp.supplierResource.home.createOrEditLabel/);
    await supplierResourceUpdatePage.cancel();
  });

  it('should create and save SupplierResources', async () => {
    await supplierResourceComponentsPage.createButton.click();
    await supplierResourceUpdatePage.setQuantityInput('5');
    expect(await supplierResourceUpdatePage.getQuantityInput()).to.eq('5');
    await supplierResourceUpdatePage.setCostInput('5');
    expect(await supplierResourceUpdatePage.getCostInput()).to.eq('5');
    await waitUntilDisplayed(supplierResourceUpdatePage.saveButton);
    await supplierResourceUpdatePage.save();
    await waitUntilHidden(supplierResourceUpdatePage.saveButton);
    expect(await isVisible(supplierResourceUpdatePage.saveButton)).to.be.false;

    expect(await supplierResourceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(supplierResourceComponentsPage.table);

    await waitUntilCount(supplierResourceComponentsPage.records, beforeRecordsCount + 1);
    expect(await supplierResourceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last SupplierResource', async () => {
    const deleteButton = supplierResourceComponentsPage.getDeleteButton(supplierResourceComponentsPage.records.last());
    await click(deleteButton);

    supplierResourceDeleteDialog = new SupplierResourceDeleteDialog();
    await waitUntilDisplayed(supplierResourceDeleteDialog.deleteModal);
    expect(await supplierResourceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/crownApp.supplierResource.delete.question/);
    await supplierResourceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(supplierResourceDeleteDialog.deleteModal);

    expect(await isVisible(supplierResourceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([supplierResourceComponentsPage.noRecords, supplierResourceComponentsPage.table]);

    const afterCount = (await isVisible(supplierResourceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(supplierResourceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
