chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'start') {
      chrome.storage.sync.set({ scraperEnabled: true });
    } else if (request.type === 'stop') {
      chrome.storage.sync.set({ scraperEnabled: false });
    }
  });