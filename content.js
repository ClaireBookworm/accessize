chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // replace body
  console.log("request.body: " + request.html);
  document.body.innerHTML = request.html;
});
