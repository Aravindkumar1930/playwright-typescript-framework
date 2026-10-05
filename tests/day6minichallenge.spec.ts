import {test,expect} from '@playwright/test'

test('mini challenge',async ({page})=>{

    await page.goto('/');

    await page.locator('.products');

    const product =  page.locator('.productlist').filter(
        {hasText:  'iPhone 15 Pro'}).filter({hasText: 'In Stock'});

        await expect(product).toContainText('In Stock');

    await product.getByRole('button', {name:'Add to Cart'}).click();

   await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked();

        await page.getByRole('radio',{name: 'Female'}).click();

        await expect(page.getByRole('radio',{name: 'Female'})).toBeChecked();
 
        await page.getByPlaceholder('Search products').fill('iPhone 15');
 await page.getByRole('button',{name:'Search'}).click();
 await expect(page.getByText('iPhone 15')).toBeVisible();

const products = page.locator('product').filter({ hasText: /^iPhone 15$/ });

await products.getByRole('button',{name:'Add to Cart'});

const user = await page.locator('tr').filter({hasText:  'Kumar'});
await expect(user.getByText('₹60,000')).toBeVisible();
const salary =  user.locator('td').nth(2).textContent();
console.log(salary);

const john = await page.locator('tr').filter({hasText:  'John'});
await expect(john).toContainText('Inactive');
await john.getByRole('button',{name: 'Edit'}).click();

const kumar = await page.locator('tr').filter({hasText: 'Kumar'}).filter({hasText:'Developer'});
await expect(kumar).toContainText('₹60,000');
await kumar.getByRole('button',{name: 'Edit'}).click();

const dropdown = page.locator('#dropdown');
await dropdown.click();
const value = dropdown.getByText('India');
await value.click();
await expect(dropdown).toHaveText('India');

const dropdown1 = page.getByRole('button',{name:'Select City'});
await dropdown1.click();
const option = page.getByText('Coimbatore');
await option.click();
await expect(dropdown).toHaveText('Coimbatore');

const kumardd= await page.locator('tr').filter(
    {hasText: 'Kumar'}).filter({hasText:'Developer'});
await kumardd.getByRole('button',{name: 'Edit'}).click();
const dd =  page.locator('#role');
await dd.selectOption('Manager');
await expect(dd).toHaveValue('Manager')

const sam =  page.locator('.productlist').filter(
        {hasText:'Samsung S24'});
        await expect(sam).toContainText('In Stock');
    await sam.getByRole('button', {name:'Add to Cart'}).click();
    
    while (true) {
       const priya = page.getByText('Priya');
        if (await priya.count()>0) {
            await expect(priya).toBeVisible();
            break;
          }else{
              await page.getByRole('button', { name: 'Next' }).click();
        }
    }


    await page.locator('#Search').fill('Kumar');
const kumars= await page.locator('tr').filter(
    {hasText: 'Kumar'});
await expect(kumars).toContainText('Developer');
await expect(kumars).toContainText('₹60,000');
await expect(kumars).toContainText('Active');


const laptop = page.locator('.product').filter(
        {hasText:'MacBook Pro'});
        await expect(laptop).toContainText('In Stock');
    const button = laptop.getByRole('button', {name:'Add to Cart'})
    await expect(button).toBeEnabled();
    button.click();

})
test('api', async({page,request})=>{

    const response = await request.get('**/users/1');
    expect(response.status()).toBe(200);
    const responsebody = await response.json();
    const bodyname = responsebody.name;
    expect(bodyname).toBe('Aravind');

    const uiName = page.getByText('bodyname') ;

expect(uiName).toHaveText('Aravind');


const pagepromise = page.context().waitForEvent('page');

await page.getByRole('button',{name:'Open Flight Details'});
const newpage = await pagepromise;
await expect(newpage).toHaveURL('/flight-details');



})

