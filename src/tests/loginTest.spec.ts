import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { encrypt, decrypt } from "../utils/CryptojsUtil";
import { encryptEnvFile } from "../utils/EncryptEnvFile";
//import { decrypt } from "dotenv";

test.skip('login page test', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(process.env.userid!);  // ! means to avoid the undefined values in the script. Not passing any null value
    await loginPage.fillPassword(process.env.password!);
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();

})

test('Sample env test', async({page}) => {

    console.log(process.env.NODE_ENV);
    console.log(process.env.userid);
    console.log(process.env.password);

})

test('Sample cryopto test', async ({page}) => {
    // const plaintext = "Hello, Mars!";
    // const encryptedText = encrypt(plaintext);
    // console.log('SALT:', process.env.SALT);
    // console.log('Encrypted:', encryptedText);
    // const decryptedText = decrypt(encryptedText)
    // console.log('Decrypted:', decryptedText);
    encryptEnvFile();
})