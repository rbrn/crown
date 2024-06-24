import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SupplyPointResourceComponentsPage, { SupplyPointResourceDeleteDialog } from './supply-point-resource.page-object';
import SupplyPointResourceUpdatePage from './supply-point-resource-update.page-object';
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

describe('SupplyPointResource e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let supplyPointResourceComponentsPage: SupplyPointResourceComponentsPage;
  let supplyPointResourceUpdatePage: SupplyPointResourceUpdatePage;
  let supplyPointResourceDeleteDialog: SupplyPointResourceDeleteDialog;
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

  it('should load SupplyPointResources', async () => {
    await navBarPage.getEntityPage('supply-point-resource');
    supplyPointResourceComponentsPage = new SupplyPointResourceComponentsPage();
    expect(await supplyPointResourceComponentsPage.title.getText()).to.match(/Supply Point Resources/);

    expect(await supplyPointResourceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([supplyPointResourceComponentsPage.noRecords, supplyPointResourceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(supplyPointResourceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(supplyPointResourceComponentsPage.table);
  });

  it('should load create SupplyPointResource page', async () => {
    await supplyPointResourceComponentsPage.createButton.click();
    supplyPointResourceUpdatePage = new SupplyPointResourceUpdatePage();
    expect(await supplyPointResourceUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /crownApp.supplyPointResource.home.createOrEditLabel/
    );
    await supplyPointResourceUpdatePage.cancel();
  });

  it('should create and save SupplyPointResources', async () => {
    await supplyPointResourceComponentsPage.createButton.click();
    await supplyPointResourceUpdatePage.setNumRequestedInput('5');
    expect(await supplyPointResourceUpdatePage.getNumRequestedInput()).to.eq('5');
    await supplyPointResourceUpdatePage.setCanProduceInput('5');
    expect(await supplyPointResourceUpdatePage.getCanProduceInput()).to.eq('5');
    await supplyPointResourceUpdatePage.setNuminStockInput('5');
    expect(await supplyPointResourceUpdatePage.getNuminStockInput()).to.eq('5');
    await supplyPointResourceUpdatePage.supplypointSelectLastOption();
    await waitUntilDisplayed(supplyPointResourceUpdatePage.saveButton);
    await supplyPointResourceUpdatePage.save();
    await waitUntilHidden(supplyPointResourceUpdatePage.saveButton);
    expect(await isVisible(supplyPointResourceUpdatePage.saveButton)).to.be.false;

    expect(await supplyPointResourceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(supplyPointResourceComponentsPage.table);

    await waitUntilCount(supplyPointResourceComponentsPage.records, beforeRecordsCount + 1);
    expect(await supplyPointResourceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last SupplyPointResource', async () => {
    const deleteButton = supplyPointResourceComponentsPage.getDeleteButton(supplyPointResourceComponentsPage.records.last());
    await click(deleteButton);

    supplyPointResourceDeleteDialog = new SupplyPointResourceDeleteDialog();
    await waitUntilDisplayed(supplyPointResourceDeleteDialog.deleteModal);
    expect(await supplyPointResourceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /crownApp.supplyPointResource.delete.question/
    );
    await supplyPointResourceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(supplyPointResourceDeleteDialog.deleteModal);

    expect(await isVisible(supplyPointResourceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([supplyPointResourceComponentsPage.noRecords, supplyPointResourceComponentsPage.table]);

    const afterCount = (await isVisible(supplyPointResourceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(supplyPointResourceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
