chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // replace body
  console.log("request.body: " + request.html);
  document.body.innerHTML = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/light.min.css">
  <style>
  body {
  max-width:80% !important;
  }
</style>${request.html}`;
  [...document.getElementsByTagName("img")].map((x) => (x.style.width = "40%"));
  [...document.getElementsByTagName("svg")].map((x) => (x.style.width = "40%"));
  [...document.getElementsByTagName("video")].map(
    (x) => (x.style.width = "40%")
  );
});
