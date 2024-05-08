const puppeteer = require('puppeteer');
//tengo que redireccionar este script ol otro

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.facebook.com/');

  // Access the login form elements
  const emailInput = await page.evaluate(() => {
    return document.querySelector('input[name="email"]');
  });

  const passInput = await page.evaluate(() => {
    return document.querySelector('input[name="pass"]');
  });

  const loginButton = await page.evaluate(() => {
    return document.querySelector('input[type="submit"]');
  });

  // Fill in the credentials and submit the form
  await page.evaluate((email, pass) => {
    emailInput.value = email;
    passInput.value = pass;
    loginButton.click();
  }, 'your_email_here', 'your_password_here');

  await page.waitForNavigation();

  await browser.close();
})();