const puppeteer = require('puppeteer');
/*

MADE WITH THE HELP OF BLACKBOX AI
IT IS NOT TESTED AND IS IN VERIFICATION PROCESS.

*/
async function scrapeFacebookMessages(page) {
  // Replace 'your-marketplace-conversation-url' with the URL of the Facebook Marketplace conversation you want to scrape
  await page.goto('https://www.facebook.com/messages/t/');

  // Wait for the messages to load
  await page.waitForSelector('.fbNubFruitSystem fbNubFruitMessage');

  // Extract the most recent message
  const message = await page.evaluate(() => {
    const messageNodes = Array.from(document.querySelectorAll('.fbNubFruitSystem fbNubFruitMessage'));
    const mostRecentMessage = messageNodes[messageNodes.length - 1];
    const sender = mostRecentMessage.querySelector('.fbNubFruitMessageSenderName')?.innerText.trim();
    const date = mostRecentMessage.querySelector('.fcg')?.innerText.trim();
    const messageText = mostRecentMessage.querySelector('.selectableText')?.innerText.trim();

    return {
      sender,
      date,
      message: messageText,
    };
  });

  console.log(message);

  await browser.close();
}

scrapeFacebookMessages();