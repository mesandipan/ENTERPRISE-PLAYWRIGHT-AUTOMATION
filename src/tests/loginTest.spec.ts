import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { encrypt, decrypt } from "../utils/CryptojsUtil";
import { encryptEnvFile } from "../utils/EncryptEnvFile";
import logger from "../utils/LoggerUtils";
//import { decrypt } from "dotenv";

test('login page test', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid!));  // ! means to avoid the undefined values in the script. Not passing any null value
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    //await homePage.expectServiceTitleToBeVisible();
    logger.info("Test for login is completed");

})

test('Sample env test', async({page}) => {

    console.log(process.env.NODE_ENV);
    console.log(process.env.userid);
    console.log(process.env.password);

})

//One time execution for encrypting the credentials
test.skip('Sample cryopto test', async ({page}) => {
    // const plaintext = "Hello, Mars!";
    // const encryptedText = encrypt(plaintext);
    // console.log('SALT:', process.env.SALT);
    // console.log('Encrypted:', encryptedText);
    // const decryptedText = decrypt(encryptedText)
    // console.log('Decrypted:', decryptedText);
    encryptEnvFile();
})