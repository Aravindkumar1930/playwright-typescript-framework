import {expect, test} from '@playwright/test'

test('GET user 2', async ({ request }) => {
const response = await request.get('/users/2');
expect (response.status()).toBe(200);
const responsebody = await response.json();
expect(responsebody.id).toBe(1);
expect(responsebody.name).toBe('name');
expect(responsebody.username).toBe('username');

const response1 = await request.post('/posts',
    {
        data:{
  "title": "Playwright",
  "body": "API Testing",
  "userId": 1}
});
expect (response1.status()).toBe(201);
const responsebody1 = await response1.json();
expect(responsebody1.id).toBeTruthy();
expect(responsebody1.title).toBe('Playwright');
expect(responsebody1.userId).toBe('1');
console.log(responsebody1);
});
test('Invalid user', async ({ request }) => {

    const response = await request.get ('/posts',{params:{
            userId:'1',}})

    expect(response.status()).toBe(200);
    const responsebody = await response.json();
    expect(Array.isArray(responsebody)).toBeTruthy();
    const hasUser1 = responsebody.some((post: { userId: number }) => post.userId === 1);
    expect(hasUser1).toBeTruthy();
    console.log(responsebody);
    const response1 = await request.put ('/posts/1',{data:{
  "title": "Updated Playwright",
  "body": "Advanced API Testing",
  "userId": 1
},})
expect(response1.status()).toBe(200);
const updatedPost = await response1.json();
expect(updatedPost.title).toBe('Updated Playwright');
expect(updatedPost.body).toBe('Advanced API Testing')
expect(updatedPost.userId).toBe(1)

const patchresponse = await request.put ('/posts/1',{data:{
  "title": "Patched Playwright",}})
expect(patchresponse.status()).toBe(200);
const patchedbody = await response1.json();
expect(patchedbody.title).toBe('Patched Playwright');
});
test('Delete post', async ({page, request }) => {

 //  const response = await request.delete('/posts/1');
 //  expect(response.status()).toBe(200);
 const token = 'abc123';
 const response1 = await request.get('/users/1', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
expect(response1.status()).toBe(200);

const respponse = await request.get('/users/1');
expect(respponse.status()).toBe(200);
const responsebody = await respponse.json();
const name = responsebody.name;
const username = responsebody.username;
await page.goto('/');
const uiname = page.getByText(name);
expect(uiname).toBeVisible();
const uiusername = page.getByText(username);
expect (uiusername).toBeVisible();


});