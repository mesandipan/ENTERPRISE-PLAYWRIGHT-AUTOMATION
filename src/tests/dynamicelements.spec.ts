import {test, expect, Locator} from "@playwright/test";

test("Handle Dynamic Elements in Playwright", async({page}) => {

    page.goto("https://testautomationpractice.blogspot.com/");

    for(let i=0; i<5; i++){
        const button: Locator = page.locator("//button[text()='START' or text()='STOP']");
        await button.click();

        await page.waitForTimeout(2000); // Wait for 1 second to allow the button text to change
    }
})