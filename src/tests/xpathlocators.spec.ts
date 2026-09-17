import {test, Locator, expect} from "@playwright/test";

test("XPath Demo in playwright", async({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    //1. Absolute xpath
    const absoluteLogo: Locator =page.locator("//html/body/div[4]/div[1]/div[1]/div[1]/a/img");
    await expect(absoluteLogo).toBeVisible();

    //2. Relative xpath
    const relativeLogo: Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(relativeLogo).toBeVisible();

    //3. XPath with contains() function
    const products: Locator = page.locator("//h2/a[contains(@href, 'computer')]");
    await page.waitForTimeout(2000);
    await expect(products).toBeVisible();
    const productsCount: number = await products.count();
    console.log("No of computer related products: "+ productsCount);
    expect(productsCount).toBeGreaterThan(0);

    // //4. XPath with starts-with() function
    // const startsWithLogo: Locator = page.locator("//img[starts-with(@alt,'Tricentis')]");
    // await expect(startsWithLogo).toBeVisible();

    // //5. XPath with text() function
    // const textLocator: Locator = page.locator("//a[text()='Register']");
    // await expect(textLocator).toBeVisible();

})