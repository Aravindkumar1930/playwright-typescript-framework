import {test as base, Page} from '@playwright/test'
import { LoginPage } from '../Pages/LoginPage'
import { ProductsPage } from '../Pages/ProductsPage'
import { CartPage } from '../Pages/cartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';
import { APIRequestContext, request as playwrightRequest } from '@playwright/test';


type Myfixture ={

    authenticatedPage: Page;
    loginpage: LoginPage;
    productpage: ProductsPage;
    cartpage : CartPage;
    checkoutpage: CheckoutPage;
    apiRequest : APIRequestContext;
}


export const test = base.extend <Myfixture>({

    loginpage : async ({page}, use )=>{

     await use(new LoginPage(page));   
    },

    productpage : async({page},use)=>{

    await use(new ProductsPage(page));
    },
    
    cartpage : async({page},use)=>{

        await use (new CartPage(page));
    },
    checkoutpage : async({page},use)=>{
        await use(new CheckoutPage(page));
    },
    authenticatedPage : async({page},use)=>{

        await use(page);
    },
     apiRequest: async ({request }, use) => {

        const token = process.env.API_TOKEN;

        const apiContext = await playwrightRequest.newContext({
            extraHTTPHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });

        await use(apiContext);

        await apiContext.dispose();
    }
})

