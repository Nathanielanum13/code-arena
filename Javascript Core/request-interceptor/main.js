(function () {
  let targetPage = "https://useragentstring.com/*";

  let ua =
    "Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16";

  function rewriteUserAgentHeader(e) {
    e.requestHeaders.forEach((header) => {
      if (header.name.toLowerCase() === "user-agent") {
        header.value = ua;
      }
    });
    return { requestHeaders: e.requestHeaders };
  }

  browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader,
    { urls: [targetPage] },
    ["blocking", "requestHeaders"]
  );
})();

let button = document.querySelector("#button");
button.addEventListener("click", async () => {
  
});
