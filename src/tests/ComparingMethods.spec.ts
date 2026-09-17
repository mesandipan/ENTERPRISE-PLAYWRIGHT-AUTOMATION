import {test, Locator} from "@playwright/test";

test('Comparing methods', async({page}) => {

    await page.goto('https://demowebshop.tricentis.com/');

    const products:Locator = page.locator('.product-title');
    const count:number = await products.count();

    //1. innerText() vs textContent()
    console.log(await products.nth(1).innerText());
    console.log(await products.nth(1).textContent());

    for(let i=0; i<count; i++){

        const productName1:string = await products.nth(i).innerText();   //Extracts plain text.Eliminates whitespace and line break. Returns only string
        const productName2 = await products.nth(i).textContent();        //Returns either string or null
        console.log(productName1);
        console.log(productName2);
        console.log(productName2?.trim());                               // ? is representing as aregular expression which means it could be null or string                       

    }

    //2. allInnerText() vs allTextContent()
    console.log("*** Comparing allInnerText() vs allTextContent() ***");
    const productNames:string[] = await products.allInnerTexts();
    console.log("Product Names captured by allTextContent(): ", productNames);

    const productNamesTrimmed:string[] = productNames.map(text => text.trim());
    console.log("Product names after trimmed: ", productNamesTrimmed);


    //3. all() - converts Locator ---> Locator[]
    // Returns array of locators
    const productsLocator:Locator[] = await products.all();
    console.log(productsLocator);

    for(let productLoc of productsLocator)
    {
        console.log(await productLoc.innerText());
    }


})