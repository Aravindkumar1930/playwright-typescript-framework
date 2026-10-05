import process from 'process';
import{test} from '../fixtures/testFixtures'
import { expect } from '@playwright/test';
import { CheckoutPage } from '../Pages/CheckoutPage';

test('Dynamic Product Selection', async({page,loginpage,productpage,
    cartpage, checkoutpage})=>{

    await page.goto('/');
    await loginpage.login(process.env.TEST_USERNAME!,process.env.TEST_PASSWORD!);

    //await productpage.productpage();
   await productpage.addProductToCart('Sauce Labs Backpack');
   await expect(productpage.cartCount).toHaveText('1');
   await productpage.addProductToCart('Sauce Labs Bike Light');
   await expect(productpage.cartCount).toHaveText('2');

   //await productpage.removeProductFromCart('Sauce Labs Backpack');
   //await expect(productpage.cartCount).not.toBeVisible();

   await productpage.openCart();

   await (cartpage.verifyProduct('Sauce Labs Backpack'));
   await (cartpage.verifyProduct('Sauce Labs Bike Light'));
   
    await cartpage.verifyItemCount(2);

    await cartpage.checkout();

    await  checkoutpage.enterCustomerInformation('Aravind','kumar','641001');

   await checkoutpage.verifyOverviewPage();

   await checkoutpage.finishOrder();

   await checkoutpage.verifyOrderCompleted();
})
