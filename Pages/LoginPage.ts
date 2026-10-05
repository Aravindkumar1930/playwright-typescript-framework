import {expect, Page} from '@playwright/test'

export class LoginPage{

    readonly page : Page;
    readonly username;
    readonly password;
    readonly loginButton;
    //readonly lockedUserError;
    //readonly invalidPasswordError;
    readonly loginError;



    constructor( page : Page){
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        //this.lockedUserError = page.locator('.error-message-container');
        //this.invalidPasswordError = page.locator('.error-message-container');
        this.loginError = page.locator('.error-message-container');
        
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();  

        } 
    async verifyLockedUserError(){
       
    await expect(this.loginError.getByText('Epic sadface: Sorry, this user has been locked out.')
).toBeVisible();
    }
    async verifyInvalidPasswordError(){
 await expect(this.loginError.getByText('Epic sadface: Username and password do not match any user in this service')
    ).toBeVisible();
    }
   }