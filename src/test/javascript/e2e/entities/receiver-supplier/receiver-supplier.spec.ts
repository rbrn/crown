import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ReceiverSupplierComponentsPage, { ReceiverSupplierDeleteDialog } from './receiver-supplier.page-object';
import ReceiverSupplierUpdatePage from './receiver-supplier-update.page-object';
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

describe('ReceiverSupplier e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let receiverSupplierComponentsPage: ReceiverSupplierComponentsPage;
  let receiverSupplierUpdatePage: ReceiverSupplierUpdatePage;
  let receiverSupplierDeleteDialog: ReceiverSupplierDeleteDialog;
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

  it('should load ReceiverSuppliers', async () => {
    await navBarPage.getEntityPage('receiver-supplier');
    receiverSupplierComponentsPage = new ReceiverSupplierComponentsPage();
    expect(await receiverSupplierComponentsPage.title.getText()).to.match(/Receiver Suppliers/);

    expect(await receiverSupplierComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([receiverSupplierComponentsPage.noRecords, receiverSupplierComponentsPage.table]);

    beforeRecordsCount = (await isVisible(receiverSupplierComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(receiverSupplierComponentsPage.table);
  });

  it('should load create ReceiverSupplier page', async () => {
    await receiverSupplierComponentsPage.createButton.click();
    receiverSupplierUpdatePage = new ReceiverSupplierUpdatePage();
    expect(await receiverSupplierUpdatePage.getPageTitle().getAttribute('id')).to.match(/crownApp.receiverSupplier.home.createOrEditLabel/);
    await receiverSupplierUpdatePage.cancel();
  });

  it('should create and save ReceiverSuppliers', async () => {
    await receiverSupplierComponentsPage.createButton.click();
    await receiverSupplierUpdatePage.setNameInput('name');
    expect(await receiverSupplierUpdatePage.getNameInput()).to.match(/name/);
    await receiverSupplierUpdatePage.setAddressInput('address');
    expect(await receiverSupplierUpdatePage.getAddressInput()).to.match(/address/);
    await receiverSupplierUpdatePage.setEmailInput('email');
    expect(await receiverSupplierUpdatePage.getEmailInput()).to.match(/email/);
    await receiverSupplierUpdatePage.setPrimaryContactNameInput('primaryContactName');
    expect(await receiverSupplierUpdatePage.getPrimaryContactNameInput()).to.match(/primaryContactName/);
    await receiverSupplierUpdatePage.setZipInput('zip');
    expect(await receiverSupplierUpdatePage.getZipInput()).to.match(/zip/);
    await receiverSupplierUpdatePage.setPhonenumberInput('phonenumber');
    expect(await receiverSupplierUpdatePage.getPhonenumberInput()).to.match(/phonenumber/);
    await receiverSupplierUpdatePage.setLatxInput('5');
    expect(await receiverSupplierUpdatePage.getLatxInput()).to.eq('5');
    await receiverSupplierUpdatePage.setLongyInput('5');
    expect(await receiverSupplierUpdatePage.getLongyInput()).to.eq('5');
    await receiverSupplierUpdatePage.setCityInput('city');
    expect(await receiverSupplierUpdatePage.getCityInput()).to.match(/city/);
    await receiverSupplierUpdatePage.setStateInput('state');
    expect(await receiverSupplierUpdatePage.getStateInput()).to.match(/state/);
    await receiverSupplierUpdatePage.setCountryInput('country');
    expect(await receiverSupplierUpdatePage.getCountryInput()).to.match(/country/);
    await receiverSupplierUpdatePage.setNpiInput('5');
    expect(await receiverSupplierUpdatePage.getNpiInput()).to.eq('5');
    const selectedIsReceiver = await receiverSupplierUpdatePage.getIsReceiverInput().isSelected();
    if (selectedIsReceiver) {
      await receiverSupplierUpdatePage.getIsReceiverInput().click();
      expect(await receiverSupplierUpdatePage.getIsReceiverInput().isSelected()).to.be.false;
    } else {
      await receiverSupplierUpdatePage.getIsReceiverInput().click();
      expect(await receiverSupplierUpdatePage.getIsReceiverInput().isSelected()).to.be.true;
    }
    const selectedIsSupplier = await receiverSupplierUpdatePage.getIsSupplierInput().isSelected();
    if (selectedIsSupplier) {
      await receiverSupplierUpdatePage.getIsSupplierInput().click();
      expect(await receiverSupplierUpdatePage.getIsSupplierInput().isSelected()).to.be.false;
    } else {
      await receiverSupplierUpdatePage.getIsSupplierInput().click();
      expect(await receiverSupplierUpdatePage.getIsSupplierInput().isSelected()).to.be.true;
    }
    const selectedHasSterilization = await receiverSupplierUpdatePage.getHasSterilizationInput().isSelected();
    if (selectedHasSterilization) {
      await receiverSupplierUpdatePage.getHasSterilizationInput().click();
      expect(await receiverSupplierUpdatePage.getHasSterilizationInput().isSelected()).to.be.false;
    } else {
      await receiverSupplierUpdatePage.getHasSterilizationInput().click();
      expect(await receiverSupplierUpdatePage.getHasSterilizationInput().isSelected()).to.be.true;
    }
    await receiverSupplierUpdatePage.setPriorityInput('5');
    expect(await receiverSupplierUpdatePage.getPriorityInput()).to.eq('5');
    await receiverSupplierUpdatePage.setNotesInput('notes');
    expect(await receiverSupplierUpdatePage.getNotesInput()).to.match(/notes/);
    await receiverSupplierUpdatePage.setTagsInput('tags');
    expect(await receiverSupplierUpdatePage.getTagsInput()).to.match(/tags/);
    await waitUntilDisplayed(receiverSupplierUpdatePage.saveButton);
    await receiverSupplierUpdatePage.save();
    await waitUntilHidden(receiverSupplierUpdatePage.saveButton);
    expect(await isVisible(receiverSupplierUpdatePage.saveButton)).to.be.false;

    expect(await receiverSupplierComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(receiverSupplierComponentsPage.table);

    await waitUntilCount(receiverSupplierComponentsPage.records, beforeRecordsCount + 1);
    expect(await receiverSupplierComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ReceiverSupplier', async () => {
    const deleteButton = receiverSupplierComponentsPage.getDeleteButton(receiverSupplierComponentsPage.records.last());
    await click(deleteButton);

    receiverSupplierDeleteDialog = new ReceiverSupplierDeleteDialog();
    await waitUntilDisplayed(receiverSupplierDeleteDialog.deleteModal);
    expect(await receiverSupplierDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/crownApp.receiverSupplier.delete.question/);
    await receiverSupplierDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(receiverSupplierDeleteDialog.deleteModal);

    expect(await isVisible(receiverSupplierDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([receiverSupplierComponentsPage.noRecords, receiverSupplierComponentsPage.table]);

    const afterCount = (await isVisible(receiverSupplierComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(receiverSupplierComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
