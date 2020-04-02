import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RecieverSupplierComponentsPage, { RecieverSupplierDeleteDialog } from './reciever-supplier.page-object';
import RecieverSupplierUpdatePage from './reciever-supplier-update.page-object';
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

describe('RecieverSupplier e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recieverSupplierComponentsPage: RecieverSupplierComponentsPage;
  let recieverSupplierUpdatePage: RecieverSupplierUpdatePage;
  let recieverSupplierDeleteDialog: RecieverSupplierDeleteDialog;
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

  it('should load RecieverSuppliers', async () => {
    await navBarPage.getEntityPage('reciever-supplier');
    recieverSupplierComponentsPage = new RecieverSupplierComponentsPage();
    expect(await recieverSupplierComponentsPage.title.getText()).to.match(/Reciever Suppliers/);

    expect(await recieverSupplierComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([recieverSupplierComponentsPage.noRecords, recieverSupplierComponentsPage.table]);

    beforeRecordsCount = (await isVisible(recieverSupplierComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(recieverSupplierComponentsPage.table);
  });

  it('should load create RecieverSupplier page', async () => {
    await recieverSupplierComponentsPage.createButton.click();
    recieverSupplierUpdatePage = new RecieverSupplierUpdatePage();
    expect(await recieverSupplierUpdatePage.getPageTitle().getAttribute('id')).to.match(/crownApp.recieverSupplier.home.createOrEditLabel/);
    await recieverSupplierUpdatePage.cancel();
  });

  it('should create and save RecieverSuppliers', async () => {
    await recieverSupplierComponentsPage.createButton.click();
    await recieverSupplierUpdatePage.setNameInput('name');
    expect(await recieverSupplierUpdatePage.getNameInput()).to.match(/name/);
    await recieverSupplierUpdatePage.setAddressInput('address');
    expect(await recieverSupplierUpdatePage.getAddressInput()).to.match(/address/);
    await recieverSupplierUpdatePage.setEmailInput('email');
    expect(await recieverSupplierUpdatePage.getEmailInput()).to.match(/email/);
    await recieverSupplierUpdatePage.setPrimaryContactNameInput('primaryContactName');
    expect(await recieverSupplierUpdatePage.getPrimaryContactNameInput()).to.match(/primaryContactName/);
    await recieverSupplierUpdatePage.setZipInput('zip');
    expect(await recieverSupplierUpdatePage.getZipInput()).to.match(/zip/);
    await recieverSupplierUpdatePage.setPhonenumberInput('phonenumber');
    expect(await recieverSupplierUpdatePage.getPhonenumberInput()).to.match(/phonenumber/);
    await recieverSupplierUpdatePage.setLatxInput('5');
    expect(await recieverSupplierUpdatePage.getLatxInput()).to.eq('5');
    await recieverSupplierUpdatePage.setLongyInput('5');
    expect(await recieverSupplierUpdatePage.getLongyInput()).to.eq('5');
    await recieverSupplierUpdatePage.setCityInput('city');
    expect(await recieverSupplierUpdatePage.getCityInput()).to.match(/city/);
    await recieverSupplierUpdatePage.setStateInput('state');
    expect(await recieverSupplierUpdatePage.getStateInput()).to.match(/state/);
    await recieverSupplierUpdatePage.setCountryInput('country');
    expect(await recieverSupplierUpdatePage.getCountryInput()).to.match(/country/);
    await recieverSupplierUpdatePage.setNpiInput('5');
    expect(await recieverSupplierUpdatePage.getNpiInput()).to.eq('5');
    const selectedIsReceiver = await recieverSupplierUpdatePage.getIsReceiverInput().isSelected();
    if (selectedIsReceiver) {
      await recieverSupplierUpdatePage.getIsReceiverInput().click();
      expect(await recieverSupplierUpdatePage.getIsReceiverInput().isSelected()).to.be.false;
    } else {
      await recieverSupplierUpdatePage.getIsReceiverInput().click();
      expect(await recieverSupplierUpdatePage.getIsReceiverInput().isSelected()).to.be.true;
    }
    const selectedIsSupplier = await recieverSupplierUpdatePage.getIsSupplierInput().isSelected();
    if (selectedIsSupplier) {
      await recieverSupplierUpdatePage.getIsSupplierInput().click();
      expect(await recieverSupplierUpdatePage.getIsSupplierInput().isSelected()).to.be.false;
    } else {
      await recieverSupplierUpdatePage.getIsSupplierInput().click();
      expect(await recieverSupplierUpdatePage.getIsSupplierInput().isSelected()).to.be.true;
    }
    const selectedHasSterilization = await recieverSupplierUpdatePage.getHasSterilizationInput().isSelected();
    if (selectedHasSterilization) {
      await recieverSupplierUpdatePage.getHasSterilizationInput().click();
      expect(await recieverSupplierUpdatePage.getHasSterilizationInput().isSelected()).to.be.false;
    } else {
      await recieverSupplierUpdatePage.getHasSterilizationInput().click();
      expect(await recieverSupplierUpdatePage.getHasSterilizationInput().isSelected()).to.be.true;
    }
    await recieverSupplierUpdatePage.setPriorityInput('5');
    expect(await recieverSupplierUpdatePage.getPriorityInput()).to.eq('5');
    await recieverSupplierUpdatePage.setNotesInput('notes');
    expect(await recieverSupplierUpdatePage.getNotesInput()).to.match(/notes/);
    await waitUntilDisplayed(recieverSupplierUpdatePage.saveButton);
    await recieverSupplierUpdatePage.save();
    await waitUntilHidden(recieverSupplierUpdatePage.saveButton);
    expect(await isVisible(recieverSupplierUpdatePage.saveButton)).to.be.false;

    expect(await recieverSupplierComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(recieverSupplierComponentsPage.table);

    await waitUntilCount(recieverSupplierComponentsPage.records, beforeRecordsCount + 1);
    expect(await recieverSupplierComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last RecieverSupplier', async () => {
    const deleteButton = recieverSupplierComponentsPage.getDeleteButton(recieverSupplierComponentsPage.records.last());
    await click(deleteButton);

    recieverSupplierDeleteDialog = new RecieverSupplierDeleteDialog();
    await waitUntilDisplayed(recieverSupplierDeleteDialog.deleteModal);
    expect(await recieverSupplierDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/crownApp.recieverSupplier.delete.question/);
    await recieverSupplierDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(recieverSupplierDeleteDialog.deleteModal);

    expect(await isVisible(recieverSupplierDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([recieverSupplierComponentsPage.noRecords, recieverSupplierComponentsPage.table]);

    const afterCount = (await isVisible(recieverSupplierComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(recieverSupplierComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
