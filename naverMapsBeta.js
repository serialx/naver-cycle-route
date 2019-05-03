/**
 * code in inject.js
 * added "web_accessible_resources": ["injected.js"] to manifest.json
 */
var s = document.createElement('script');
s.src = chrome.extension.getURL('naverMapsBetaInjected.js');
s.onload = function() {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "naver_bicycle_route")) {
    console.log("Content script received message: " + event.data.json);
    chrome.runtime.sendMessage({'type': 'naver_bicycle_route', 'json': event.data.json})
  }
});
