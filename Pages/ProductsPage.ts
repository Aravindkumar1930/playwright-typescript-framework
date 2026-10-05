import { expect, Locator, Page } from "@playwright/test";
export class ProductsPage{
    readonly page!: Page;
    readonly productheading!: Locator;
    readonly productCard!: Locator;
    readonly addToCartButtons!: Locator;
    readonly cartIcon!: Locator;
    readonly cartCount!: Locator;
    //readonly productName!: Locator;
    readonly cartList!: Locator;

constructor(page:Page){
    this.page =page ;
    this.productheading = page.getByText('Products');
   // this.productCard = page.locator('.inventory_item').filter({hasText:'Sauce Labs Backpack'}); 
   this.productCard = page.locator('.inventory_item');
   this.addToCartButtons = this.productCard.getByRole('button',{name:'Add to cart'});
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartCount = page.locator('.shopping_cart_badge');
    //this.productName = this.productCard.locator('.inventory_item');
  
}
async productpage(){
    await expect(this.productheading).toBeVisible();
    await expect(this.productCard).toBeVisible();
    await this.addToCartButtons.click();
    await expect(this.cartCount).toHaveText('1');
}
async addProductToCart(productName: string) {

    const product = this.productCard.filter({hasText: productName})

    await product.getByRole('button',{name:'Add to cart'}).click();
}
async removeProductFromCart(productName: string) {

    const product = this.productCard.filter({hasText: productName})

    await product.getByRole('button',{name:'Remove'}).click();
}
async openCart() {
    await this.cartIcon.click();

}
async addProductIfInStock(productName: string) {
    const product = this.productCard.filter({ hasText: productName });

    await expect(product).toBeVisible();

    const button = product.getByRole('button', { name: 'Add to Cart' });

    const isDisabled = await button.isDisabled();

    if (!isDisabled) {
        await button.click();
    }
}
}

