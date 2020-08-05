import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DeliveryComponentsPage, { DeliveryDeleteDialog } from './delivery.page-object';
import DeliveryUpdatePage from './delivery-update.page-object';
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

describe('Delivery e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let deliveryComponentsPage: DeliveryComponentsPage;
  let deliveryUpdatePage: DeliveryUpdatePage;
  let deliveryDeleteDialog: DeliveryDeleteDialog;
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

  it('should load Deliveries', async () => {
    await navBarPage.getEntityPage('delivery');
    deliveryComponentsPage = new DeliveryComponentsPage();
    expect(await deliveryComponentsPage.title.getText()).to.match(/Deliveries/);

    expect(await deliveryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([deliveryComponentsPage.noRecords, deliveryComponentsPage.table]);

    beforeRecordsCount = (await isVisible(deliveryComponentsPage.noRecords)) ? 0 : await getRecordsCount(deliveryComponentsPage.table);
  });

  it('should load create Delivery page', async () => {
    await deliveryComponentsPage.createButton.click();
    deliveryUpdatePage = new DeliveryUpdatePage();
    expect(await deliveryUpdatePage.getPageTitle().getAttribute('id')).to.match(/crownApp.delivery.home.createOrEditLabel/);
    await deliveryUpdatePage.cancel();
  });

  it('should create and save Deliveries', async () => {
    await deliveryComponentsPage.createButton.click();
    await deliveryUpdatePage.setDeliveryContactInput('deliveryContact');
    expect(await deliveryUpdatePage.getDeliveryContactInput()).to.match(/deliveryContact/);
    await deliveryUpdatePage.setPhoneNumberInput('phoneNumber');
    expect(await deliveryUpdatePage.getPhoneNumberInput()).to.match(/phoneNumber/);
    await deliveryUpdatePage.setNotesInput('notes');
    expect(await deliveryUpdatePage.getNotesInput()).to.match(/notes/);
    await waitUntilDisplayed(deliveryUpdatePage.saveButton);
    await deliveryUpdatePage.save();
    await waitUntilHidden(deliveryUpdatePage.saveButton);
    expect(await isVisible(deliveryUpdatePage.saveButton)).to.be.false;

    expect(await deliveryComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(deliveryComponentsPage.table);

    await waitUntilCount(deliveryComponentsPage.records, beforeRecordsCount + 1);
    expect(await deliveryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Delivery', async () => {
    const deleteButton = deliveryComponentsPage.getDeleteButton(deliveryComponentsPage.records.last());
    await click(deleteButton);

    deliveryDeleteDialog = new DeliveryDeleteDialog();
    await waitUntilDisplayed(deliveryDeleteDialog.deleteModal);
    expect(await deliveryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/crownApp.delivery.delete.question/);
    await deliveryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(deliveryDeleteDialog.deleteModal);

    expect(await isVisible(deliveryDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([deliveryComponentsPage.noRecords, deliveryComponentsPage.table]);

    const afterCount = (await isVisible(deliveryComponentsPage.noRecords)) ? 0 : await getRecordsCount(deliveryComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
