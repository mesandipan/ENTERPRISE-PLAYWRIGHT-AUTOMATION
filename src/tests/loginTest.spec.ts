import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test('login page test', async({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername("sandycool.cool94@gmail.com");
    await loginPage.fillPassword("Rintu@742101");

    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();

})