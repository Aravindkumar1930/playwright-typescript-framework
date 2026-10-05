import { expect } from '@playwright/test';
import {test}from '../fixtures/testFixtures'

test('products', async ({ page, productpage }) => {
    await page.goto('/inventory.html');

    await productpage.addProductToCart('Sauce Labs Backpack');

    expect (page.getByText('1')).toBeVisible();

   await page.frameLocator('[name="payment"]').getByLabel
   ('Card Number').fill('1212465445644654');
   await page.frameLocator('[name="payment"]').getByLabel
   ('CVV').fill('1235');

   await page.frameLocator('[name="payment"]').getByRole('button',{name:'Pay Now'});

   const downloadPromise = page.waitForEvent('download');

   await page.getByRole('button', {name: 'Download Invoice'}).click();

   const download = await downloadPromise;

   await download.saveAs('downloads/invoice.pdf');

   const filename = download.suggestedFilename;

   console.log(filename);

const uploadPromise = page.waitForEvent('filechooser');
   await page.getByRole('button', {name: 'Upload Resume'}).click();
const upload = await uploadPromise;
await upload.setFiles('files/resume.pdf')
    
page.on('dialog', async dialog => {

    await expect(dialog.message()).toBe('Are you sure you want to delete your account?');
    await dialog.accept();

})
await page.getByRole('button',{name: 'Delete Account'}).click();

await page.getByRole('button',{name: 'Login'}).click();
await page.waitForURL('/dashboard');

await page.getByRole('button', { name: 'Login' }).click();

await page.waitForLoadState('load');
});

test('advanced newtwork interception', async ({page,request})=>{

    await page.route('/api/products/1', async route =>{

const response = await route.fetch();
const body = await response.json();
body.stock= true;
await route.fulfill({
    response, json: body,
});
    });})
test('browser context', async ({browser})=>{

    const context1 = await browser.newContext();
    const page1 =  await context1.newPage();
   await page1.goto('https://www.saucedemo.com/');
    await page1.getByPlaceholder('Username').fill('standard_user');
    await page1.getByPlaceholder('Password').fill('secret_sauce');
    await page1.getByRole('button',{name:'login'}).click();
    await expect(page1.getByText('Products')).toBeVisible();

    const context2 = await browser.newContext();
    const page2 =  await context2.newPage();
   await page2.goto('https://www.saucedemo.com/');
    await page2.getByPlaceholder('Username').fill('problem_user');
    await page2.getByPlaceholder('Password').fill('secret_sauce');
    await page2.getByRole('button',{name:'login'}).click();
    await expect(page2.getByText('Products')).toBeVisible();
})