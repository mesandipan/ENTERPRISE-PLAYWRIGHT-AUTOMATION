import {test, expect, Locator} from "@playwright/test";

test("Verify Playwright Locators", async({page}) => {

    // goto method is used to launch the browser
    await page.goto("https://en.wikipedia.org/wiki/Main_Page");                     
    const logo:Locator=page.getByAltText("Wikipedia");      //getByAltText identifies images based on the alt attribute. Locator is a Playwright type/object used to find elements.
    await expect(logo).toBeVisible();

    await expect(page.getByText("Welcome to Wikipedia")).toBeVisible();     //getByText identifies the text contains like substring, exact string. Non-interactive elements.
    await expect(page.getByText("Welcome to")).toBeVisible();               //partial text
    await expect(page.getByText(/Welcome\s+To\s+Wikipedia/i)).toBeVisible();//i represents ignore case sentivity. This is a regular expression.

    await page.getByRole("link", {name:'View source'}).click();             //Identifies interactive elements like buttons,checkboxes,headings,links,lists,tables etc.
    await expect(page.getByRole("heading",{name:'Why is the page protected?'})).toBeVisible();

    await page.getByRole("link", {name:'Log in'}).click();
    page.getByLabel('Username').fill("Sandipan");       //getByLabel() is used to locate form control by label's text
    page.getByLabel('Password').fill("Mallick");

    //page.getByPlaceholder("Search store").fill('');        //To locate an input by placeholder

    page.getByTitle("Log in");                              //Used when element has a meaningful title attribute.

    page.getByTestId("");                            //TO locate an element based on its data-testid attribute.

});