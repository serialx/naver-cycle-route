

chrome.runtime.onInstalled.addListener(function() {
});

chrome.runtime.onMessage.addListener(function(req, sender) {
  chrome.storage.local.set({json: req.json})
  chrome.pageAction.show(sender.tab.id);
  chrome.pageAction.setTitle({tabId: sender.tab.id, title: "JSON"});

  chrome.pageAction.onClicked.addListener(function(tab) {
    alert(req.json);
  });
});
