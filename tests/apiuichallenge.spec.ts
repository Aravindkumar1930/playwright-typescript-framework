import {expect, test} from '@playwright/test'
import { json } from 'node:stream/consumers';

test('API UI test', async ({request})=>{

const response = await request.get('/users/1');
expect (response.status()).toBe(200);
const body = await response.json();
expect(body.id).toBe(1);
console.log(body);

const response1 = await request.post('/posts', {
    data: {
        title: 'Playwright',
        body: 'API testing',
        userId: 1
    }
});

expect(response1.status()).toBe(201);

const body1 = await response1.json();
const postId = body1.id;

expect(postId).toBeTruthy();

// Existing resource
const getResponse = await request.get('/posts/1');

expect(getResponse.status()).toBe(200);

const getBody = await getResponse.json();

expect(getBody.id).toBe(1);

const updateResponse = await request.put('/posts/1', {
    data: {
        title: 'Updated Playwright',
        body: 'Advanced API testing',
        userId: 1
    }
});
expect(updateResponse.status()).toBe(200);
const updateBody = await updateResponse.json();
expect(updateBody.title).toBe('Updated Playwright');

const deleteResponse = await request.delete('/posts/1');
expect(deleteResponse.status()).toBe(200);
})
test('API response validation',async({request})=>{

    const response = await request.get('/users/1');
    expect(response.status()).toBe(200);
    console.log(response);
    const body = await response.json();
    expect(body.email).toBe('Sincere@april.biz');
    expect(body.address.city).toBe('Gwenborough');

    const response1 = await request.get('/users/1');
    const header = response1.headers();
    console.log(header['content-type']);
expect(header['content-type']).toContain('application/json');

const token = 'test-token';
const response2 = await request.get('/users/1', {
    headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
    },
});
const body1 = await response2.json();
expect(body1).toBeTruthy();

})
test('networintereption', async ({page, request})=>{

await page.route('/api/products', async (route) => {
    // your code

    await route.fulfill({
         status: 200,
    contentType: 'application/json',
        body: JSON.stringify({
            name: 'Fake Product',
            price: '100'
        })
    })
});
await page.goto('/api/products');
await page.route('/api/products', async (route) => {
    await route.continue();
});

const responsePromise = page.waitForResponse(
    response => response.url().includes('/api/orders') &&
    response.request().method() == 'POST'
);

await page.getByRole('button',{name:'Place Order'}).click();

const response = await responsePromise;
expect(response.status()).toBe(200);
const responseBody = await response.json();
expect(responseBody.status).toBeTruthy();
expect(responseBody.status).toBe('success');
})

