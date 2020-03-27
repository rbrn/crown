import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ResourceComponentsPage, ResourceDeleteDialog, ResourceUpdatePage } from './resource.page-object';

const expect = chai.expect;

describe('Resource e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let resourceComponentsPage: ResourceComponentsPage;
  let resourceUpdatePage: ResourceUpdatePage;
  let resourceDeleteDialog: ResourceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Resources', async () => {
    await navBarPage.goToEntity('resource');
    resourceComponentsPage = new ResourceComponentsPage();
    await browser.wait(ec.visibilityOf(resourceComponentsPage.title), 5000);
    expect(await resourceComponentsPage.getTitle()).to.eq('crownApp.resource.home.title');
    await browser.wait(ec.or(ec.visibilityOf(resourceComponentsPage.entities), ec.visibilityOf(resourceComponentsPage.noResult)), 1000);
  });

  it('should load create Resource page', async () => {
    await resourceComponentsPage.clickOnCreateButton();
    resourceUpdatePage = new ResourceUpdatePage();
    expect(await resourceUpdatePage.getPageTitle()).to.eq('crownApp.resource.home.createOrEditLabel');
    await resourceUpdatePage.cancel();
  });

  it('should create and save Resources', async () => {
    const nbButtonsBeforeCreate = await resourceComponentsPage.countDeleteButtons();

    await resourceComponentsPage.clickOnCreateButton();

    await promise.all([
      resourceUpdatePage.setNameInput('name'),
      resourceUpdatePage.setNotesInput('notes'),
      resourceUpdatePage.supplyPointResourceSelectLastOption()
    ]);

    expect(await resourceUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await resourceUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');

    await resourceUpdatePage.save();
    expect(await resourceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await resourceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Resource', async () => {
    const nbButtonsBeforeDelete = await resourceComponentsPage.countDeleteButtons();
    await resourceComponentsPage.clickOnLastDeleteButton();

    resourceDeleteDialog = new ResourceDeleteDialog();
    expect(await resourceDeleteDialog.getDialogTitle()).to.eq('crownApp.resource.delete.question');
    await resourceDeleteDialog.clickOnConfirmButton();

    expect(await resourceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
