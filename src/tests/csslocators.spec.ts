/*
CSS (Cascading style sheets)
HTML+JS+CSS = Webpage

2 types of css locators:

a) absolute css locators
b) relative css locators

*/

import {test,expect} from "@playwright/test";

test("Verify CSS selector", async({page}) => {

    await page.goto("https://demowebshop.tricentis.com/", {
        waitUntil:"load",
        timeout: 60000
    });

    // tag#id
    await expect(page.locator("input#small-searchterms")).toBeVisible();
    await page.locator("#small-searchterms").fill("T-Shirts");

    //tag.class
    await page.locator

});