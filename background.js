chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.storage.local.get(["websites"], function(result) {
    const websites = result.websites;
    if (websites && websites.length) {
      const match = websites.find(site => changeInfo.url.includes(site));
      if (match) {
        console.log("match found: ", match);
        chrome.windows.create({
          type: "popup",
          url: "popup.html",
          width: 1980,
          height: 1080,
        });
      }
    }
  });
});