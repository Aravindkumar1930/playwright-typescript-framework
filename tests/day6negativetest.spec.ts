import process from "process";
import { test } from "../fixtures/testFixtures";
import { checkoutData } from "../test-data/checkoutData";
import { LoginPage } from "../Pages/LoginPage";

test('negative scenario',async({page,loginpage,productpage,cartpage,checkoutpage})=>{

await page.goto('/');
await loginpage.login(process.env.TEST_USERNAME,process.env.TEST_PASSWORD);
await productpage.addProductToCart('Sauce Labs Fleece Jacket');
await productpage.openCart();
await cartpage.verifyProduct('Sauce Labs Fleece Jacket');
await cartpage.checkout();
await checkoutpage.enterCustomerInformation('','kumar','641001');
await checkoutpage.verifyFirstNameRequiredError();
})

checkoutData.forEach((data) => {
    test(`checkout with ${data.firstName}`, async ({ page,loginpage,productpage,
        cartpage,checkoutpage }) => {

        // test steps here
         await page.goto('/');
        await loginpage.login(process.env.TEST_USERNAME,process.env.TEST_PASSWORD);
await productpage.addProductToCart('Sauce Labs Fleece Jacket');
await productpage.openCart();
await cartpage.verifyProduct('Sauce Labs Fleece Jacket');
await cartpage.checkout();

})
});