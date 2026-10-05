import {expect, Locator, Page } from "@playwright/test";

export class CartPage{

    readonly page: Page;
    readonly cartList : Locator;
    readonly cartItem: Locator;
    readonly checkoutbutton : Locator;

    constructor (page:Page){
            
        this.page = page;
        this.cartList = page.locator('.cart_list');
        this.cartItem = this.cartList.locator('.cart_item');
        this.checkoutbutton = page.getByRole('button',
            {name: 'Checkout'});
    }

    async verifyProduct(productName: string){

        await expect(this.cartList).toBeVisible();

    await expect(this.cartList.getByText(productName)).toBeVisible();
    }
    async verifyItemCount(expectedCount: number) {

 await expect(this.cartItem).toHaveCount(expectedCount);
}
async checkout(){

        await this.checkoutbutton.click();

    }
}
