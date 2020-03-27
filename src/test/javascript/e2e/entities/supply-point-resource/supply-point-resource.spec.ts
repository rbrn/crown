import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  SupplyPointResourceComponentsPage,
  SupplyPointResourceDeleteDialog,
  SupplyPointResourceUpdatePage
} from './supply-point-resource.page-object';

const expect = chai.expect;

describe('SupplyPointResource e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let supplyPointResourceComponentsPage: SupplyPointResourceComponentsPage;
  let supplyPointResourceUpdatePage: SupplyPointResourceUpdatePage;
  let supplyPointResourceDeleteDialog: SupplyPointResourceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SupplyPointResources', async () => {
    await navBarPage.goToEntity('supply-point-resource');
    supplyPointResourceComponentsPage = new SupplyPointResourceComponentsPage();
    await browser.wait(ec.visibilityOf(supplyPointResourceComponentsPage.title), 5000);
    expect(await supplyPointResourceComponentsPage.getTitle()).to.eq('crownApp.supplyPointResource.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(supplyPointResourceComponentsPage.entities), ec.visibilityOf(supplyPointResourceComponentsPage.noResult)),
      1000
    );
  });

  it('should load create SupplyPointResource page', async () => {
    await supplyPointResourceComponentsPage.clickOnCreateButton();
    supplyPointResourceUpdatePage = new SupplyPointResourceUpdatePage();
    expect(await supplyPointResourceUpdatePage.getPageTitle()).to.eq('crownApp.supplyPointResource.home.createOrEditLabel');
    await supplyPointResourceUpdatePage.cancel();
  });

  it('should create and save SupplyPointResources', async () => {
    const nbButtonsBeforeCreate = await supplyPointResourceComponentsPage.countDeleteButtons();

    await supplyPointResourceComponentsPage.clickOnCreateButton();

    await promise.all([
      supplyPointResourceUpdatePage.setNumRequestedInput('5'),
      supplyPointResourceUpdatePage.setCanProduceInput('5'),
      supplyPointResourceUpdatePage.setNuminStockInput('5'),
      supplyPointResourceUpdatePage.supplyPointSelectLastOption()
    ]);

    expect(await supplyPointResourceUpdatePage.getNumRequestedInput()).to.eq('5', 'Expected numRequested value to be equals to 5');
    expect(await supplyPointResourceUpdatePage.getCanProduceInput()).to.eq('5', 'Expected canProduce value to be equals to 5');
    expect(await supplyPointResourceUpdatePage.getNuminStockInput()).to.eq('5', 'Expected numinStock value to be equals to 5');

    await supplyPointResourceUpdatePage.save();
    expect(await supplyPointResourceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await supplyPointResourceComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SupplyPointResource', async () => {
    const nbButtonsBeforeDelete = await supplyPointResourceComponentsPage.countDeleteButtons();
    await supplyPointResourceComponentsPage.clickOnLastDeleteButton();

    supplyPointResourceDeleteDialog = new SupplyPointResourceDeleteDialog();
    expect(await supplyPointResourceDeleteDialog.getDialogTitle()).to.eq('crownApp.supplyPointResource.delete.question');
    await supplyPointResourceDeleteDialog.clickOnConfirmButton();

    expect(await supplyPointResourceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
