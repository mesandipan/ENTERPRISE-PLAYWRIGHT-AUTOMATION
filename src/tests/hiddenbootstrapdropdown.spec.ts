import {test,Locator} from "@playwright/test";

test('Bootstrap hidden fixture', async({page}) => {
    test.setTimeout(60000);

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.waitForTimeout(6000);

    //Login Steps
    page.locator("input[name='username']").fill('Admin');
    await page.waitForTimeout(4000);
    page.locator("input[name='password']").fill('admin123');
    page.locator("button[type='submit']").click();

    //Click on the PIM
    await page.getByText('PIM').click();

    //Click on Job title dropdown
    await page.locator('form i').nth(2).click();
    await page.waitForTimeout(5000);

    //Capture all the drop down values
    const options:Locator = page.locator("div[role='listbox'] span");

    const count:number = await options.count();
    console.log("Number of optiosn in a dropdown: ", count);

    //Print all the options
    console.log("Printing all the options:- ");
    for(let i=0;i<count;i++)
    {
        console.log(await options.nth(i).textContent());
    }


    //Select/click on a particular option
    for(let i=0;i<count;i++)
    {
        const text= await options.nth(i).innerText();
        if(text === 'QA Engineer')
        {
            await options.nth(i).click();
            break;
        }
    }
    await page.waitForTimeout(9000);

});