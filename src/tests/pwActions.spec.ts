import {test,Locator, expect} from "@playwright/test";

test('Text input actions', async({page})=> {

    await page.goto("https://testautomationpractice.blogspot.com/", {
        waitUntil:"load",
        timeout: 60000
    });

    const textBox:Locator=page.locator('#name');
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();

    //Returns the value of the maxlength attribute of the element
    const maxLength:string | null = await textBox.getAttribute("maxlength")
    expect(maxLength).toBe('15');

    await textBox.fill('John Cenedy');

    //Returns empty value
    //console.log("Text Contect of FirstName: ", await textBox.textContent());

    //Returns the input value of the text box
    const enteredValue:string = await textBox.inputValue();
    console.log("Input value of the FirstName: ", enteredValue);
    expect(enteredValue).toBe('John Cenedy');

});

test('Radio Button actions', async({page})=> {

    await page.goto("https://testautomationpractice.blogspot.com/", {
        waitUntil:"load",
        timeout: 60000
    });

    const genderRadioButton:Locator=page.locator('#male');
    await expect(genderRadioButton).toBeVisible();
    await expect(genderRadioButton).toBeEnabled();
    expect(await genderRadioButton.isChecked()).toBe(false);

    //Select the radio button
    await genderRadioButton.check();
    expect(await genderRadioButton.isChecked()).toBe(true);
    await expect(genderRadioButton).toBeChecked();

});

test.only('Checkbox actions', async({page})=> {

    await page.goto("https://testautomationpractice.blogspot.com/", {
        waitUntil:"load",
        timeout: 60000
    });

    //1. Select specific checkbox(Sunday) using getByLabel and assert
    const sundayCheckBox:Locator=page.getByLabel('Sunday');
    //Select the check box
    //await sundayCheckBox.check();
    //await expect(sundayCheckBox).toBeChecked();

    //2. Select all checkboxes and assert each is checked
    const days:string[]=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const checkBoxes:Locator[]=days.map(index =>  page.getByLabel(index));
    expect(checkBoxes.length).toBe(7);

    //3.Select all checkboxes and assert each is checked
    for(const checkbox of checkBoxes){
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    //4.Uncheck last 3 checkboxes and assert
    for(const checkbox of checkBoxes.slice(-3)){
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }


    //5.Toggle checkboxes: If checked, uncheck; If unchecked, check. Assert state flipped.
    for(const checkbox of checkBoxes){

        if(await checkbox.isChecked())
        {
            //Applicable only if checked
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();

        }
        else{
        //Applicable only if not checked
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        }
    }


    //6.Check random checkboxes
    const indexs:number[]=[1,3,6];

    for(const i of indexs)
    {
        await checkBoxes[i].check();
        await expect(checkBoxes[i]).toBeChecked();
    }

    //7.Select the checkbox based of the label value
    const weekname:string="Friday";
    for(const label of days)
    {
        if(label === weekname)
        {
            const checkbox = page.getByLabel(label);
            checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }


});