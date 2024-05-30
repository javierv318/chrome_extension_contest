const { Client } = require('@elastic/elasticsearch');
const esClient = new Client({ node: 'http://localhost:9200' });

let browser;
let page;

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === 'start') {
    // Launch a new browser instance
    browser = await puppeteer.launch();
    page = await browser.newPage();

    // Replace 'your-marketplace-conversation-url' with the URL of the Facebook Marketplace conversation you want to scrape
    await page.goto('https://www.facebook.com/messages/t/');

    await page.waitForNavigation();

    // Wait for the messages to load
    await page.waitForSelector('.fbNubFruitSystem fbNubFruitMessage');

    // Start the message retrieval loop
    retrieveMessages();

    sendResponse({ status: 'started' });
  } else if (request.type === 'stop') {
    // Close the browser instance
    await browser.close();

    sendResponse({ status: 'stopped' });
  }
});

async function retrieveMessages() {
  // Extract the most recent message
  const message = await page.evaluate(() => {
    const messageNodes = Array.from(document.querySelectorAll('.fbNubFruitSystem fbNubFruitMessage'));

    if (messageNodes.length === 0) {
      return {
        sender: 'N/A',
        date: 'N/A',
        message: 'No messages found',
      };
    }

    const mostRecentMessage = messageNodes[messageNodes.length - 1];

    if (!mostRecentMessage) {
      return {
        sender: 'N/A',
        date: 'N/A',
        message: 'No messages found',
      };
    }

    const sender = mostRecentMessage.querySelector('.fbNubFruitMessageSenderName')?.innerText.trim();
    const date = mostRecentMessage.querySelector('.fcg')?.innerText.trim();
    const messageText = mostRecentMessage.querySelector('.selectableText')?.innerText.trim();

    return {
      sender,
      date,
      message: messageText,
    };
  });

  // Index the message in Elasticsearch
  await esClient.index({
    index: 'facebook-messages',
    body: message,
  });

  // Wait for 5 seconds before retrieving the next message
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Continue the message retrieval loop
  retrieveMessages();
}