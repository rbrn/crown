import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ClaimComponentsPage, { ClaimDeleteDialog } from './claim.page-object';
import ClaimUpdatePage from './claim-update.page-object';
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

describe('Claim e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let claimComponentsPage: ClaimComponentsPage;
  let claimUpdatePage: ClaimUpdatePage;
  /* let claimDeleteDialog: ClaimDeleteDialog; */
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

  it('should load Claims', async () => {
    await navBarPage.getEntityPage('claim');
    claimComponentsPage = new ClaimComponentsPage();
    expect(await claimComponentsPage.title.getText()).to.match(/Claims/);

    expect(await claimComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([claimComponentsPage.noRecords, claimComponentsPage.table]);

    beforeRecordsCount = (await isVisible(claimComponentsPage.noRecords)) ? 0 : await getRecordsCount(claimComponentsPage.table);
  });

  it('should load create Claim page', async () => {
    await claimComponentsPage.createButton.click();
    claimUpdatePage = new ClaimUpdatePage();
    expect(await claimUpdatePage.getPageTitle().getAttribute('id')).to.match(/crownApp.claim.home.createOrEditLabel/);
    await claimUpdatePage.cancel();
  });

  /*  it('should create and save Claims', async () => {
        await claimComponentsPage.createButton.click();
        await claimUpdatePage.setQuantityInput('5');
        expect(await claimUpdatePage.getQuantityInput()).to.eq('5');
        await claimUpdatePage.setNotesInput('notes');
        expect(await claimUpdatePage.getNotesInput()).to.match(/notes/);
        await claimUpdatePage.receiverResourceSelectLastOption();
        await claimUpdatePage.supplierResourceSelectLastOption();
        await waitUntilDisplayed(claimUpdatePage.saveButton);
        await claimUpdatePage.save();
        await waitUntilHidden(claimUpdatePage.saveButton);
        expect(await isVisible(claimUpdatePage.saveButton)).to.be.false;

        expect(await claimComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(claimComponentsPage.table);

        await waitUntilCount(claimComponentsPage.records, beforeRecordsCount + 1);
        expect(await claimComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last Claim', async () => {

        const deleteButton = claimComponentsPage.getDeleteButton(claimComponentsPage.records.last());
        await click(deleteButton);

        claimDeleteDialog = new ClaimDeleteDialog();
        await waitUntilDisplayed(claimDeleteDialog.deleteModal);
        expect(await claimDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/crownApp.claim.delete.question/);
        await claimDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(claimDeleteDialog.deleteModal);

        expect(await isVisible(claimDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([claimComponentsPage.noRecords,
        claimComponentsPage.table]);
    
        const afterCount = await isVisible(claimComponentsPage.noRecords) ? 0 : await getRecordsCount(claimComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
