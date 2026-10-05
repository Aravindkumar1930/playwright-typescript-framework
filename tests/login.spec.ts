import {test} from '../fixtures/testFixtures'
import { invalidPasswordUser, lockedUser, validUser } from '../test-data/users';
import { generateRandomEmail } from '../utils/randomData';
import { getTodayDate } from '../utils/dateutili';

// Login automation test
test('login test with valid user', async ({page,loginpage,productpage})=>{
await page.goto('/');

const env = (globalThis as unknown as { process: { env: Record<string, string | undefined> } }).process.env;
await loginpage.login(env.TEST_USERNAME!,env.TEST_PASSWORD!);
await productpage.productpage();
//const todayDate = getTodayDate();
//console.log('Today Date:', todayDate);
})

test('login test with locked user', async ({page,loginpage})=>{

    await page.goto('/');
    await loginpage.login(lockedUser.username,lockedUser.password);
    await loginpage.verifyLockedUserError();

    const randomEmail = generateRandomEmail();
    console.log('Random Email:', randomEmail);
})
test('login test with Invalid password',async({page,loginpage})=>{

    await page.goto('/');
    await loginpage.login(invalidPasswordUser.username,invalidPasswordUser.password);
    await loginpage.verifyInvalidPasswordError();
})