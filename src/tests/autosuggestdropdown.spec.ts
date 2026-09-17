import {test,expect,Locator} from "@playwright/test";

test('Handle AutoSuggest Drop Down', async({page}) => {
    test.setTimeout(60000);

    await page.goto("https://www.flipkart.com/");

    await page.waitForTimeout(3000);
    //Close the login window pop-up
    page.locator("//span[@role='button']").click();

    //Search text
    await page.waitForTimeout(3000);
    const searchBox = page.locator("input[name='q']:not([readonly])");
    await searchBox.fill("smart");
    await page.waitForTimeout(5000);

    //Get all the suggested options counts
    //Press Ctrl+Shft+P on the DOM and execute 'emulate a focused page'. Next the page will be freezed and we can inspect the auto suggest drop down values.
    //Once the dynamic elements are located disable the emulate by pressing Ctrl+Shft+P again and type 'Do not emulate a focused page'. Next page will be unfreezed.
    
    const options:Locator=page.locator("ul>li");
    const count = await options.count();
    console.log("Number of suggested options: ", count);
    await page.waitForTimeout(5000);

    //Printing all the suggested options in the console
    for(let i=0; i< count; i++)
    {
        const text = await options.nth(i).innerText();
        console.log(text.trim());
    }

    //Select or click on the smartphone option
    for(let i=0; i< count; i++)
    {
        const text = await options.nth(i).innerText();
        if(text === 'smartphone')
        {
            options.nth(i).click();
            await page.waitForTimeout(5000);
            break;
        }
    }
    
});