import { test as setup } from '@playwright/test';

setup('brower context', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage ();
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{name: 'Login'}).click();
    //await expect(page.getByText('Products')).toBeVisible();
    await context.storageState({path:'playwright/.auth/user.json'})

});