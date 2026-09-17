import {Page} from "@playwright/test";
import HomePage from "../pages/HomePage";
import logger from "../utils/LoggerUtils";

export default class loginPage{
    private readonly usernameInputSelector = 'input[name="username"]';
    private readonly passwordInputSelector = 'input[name="password"]';
    private readonly loginButtonInputSelector = 'button[type="submit"]';

    constructor(private page: Page) {

    }

    async navigateToLoginPage() {
        await this.page.goto("/");
        logger.info('Navigated to OrangeHRM login page');
    }

    async fillUsername(username: string){
        await this.page.locator(this.usernameInputSelector).fill(username);
        logger.info("Filled Username");
    }

    async fillPassword(password: string){
        await this.page.locator(this.passwordInputSelector).fill(password);
        logger.info("Filled Password");
    }

    async clickLoginButton() {
        await this.page
            .locator(this.loginButtonInputSelector)
            .click()
            .catch((error) => {
                logger.error(`Error clicking login button: ${error}`);
                throw error;
            }).then(() => logger.info("Clicked login button"));

            const homePage = new HomePage(this.page);
            return homePage;
    }
}