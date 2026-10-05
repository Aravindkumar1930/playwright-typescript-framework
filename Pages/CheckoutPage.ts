import { Page,Locator, expect } from "@playwright/test";

export class CheckoutPage{

    readonly page : Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly overviewHeading: Locator;
    readonly finishButton : Locator;
    readonly successmessage : Locator;
    readonly firstNameError: Locator;

    constructor (page:Page){

        this.page = page;
        this.firstName = page.getByLabel('First Name');
        this.lastName = page.getByLabel('Last Name')
        this.postalCode = page.getByLabel('Zip/Postal Code')
        this.continueButton = page.getByRole('button', {name: 'Continue'});
        this.overviewHeading = page.getByText('Checkout: Overview');
        this.finishButton = page.getByRole('button',{name:'Finish'});
        this.successmessage = page.getByText('Thank you for your order!');
       this.firstNameError = page.locator('[data-test="error"]');

    }
async enterCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
) {
await this.firstName.fill(firstName);
await this.lastName.fill(lastName);
await this.postalCode.fill(postalCode);
await this.continueButton.click();

}
async verifyOverviewPage(){
 await expect(this.overviewHeading).toBeVisible();
}
async finishOrder(){

    await this.finishButton.click();

}
async verifyOrderCompleted(){

    await expect(this.successmessage).toBeVisible();
}
async verifyFirstNameRequiredError() {
    // your expect here
 await expect(this.firstNameError).toHaveText('Error: First Name is required');
}
}