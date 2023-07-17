// Inject aXe-Core into the web page
const script = document.createElement('script');
script.src = chrome.runtime.getURL('axe-core/axe.min.js');
script.onload = function () {
  this.remove();

  // Handle messages from the extension popup
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'runAccessibilityTest') {
      // Perform accessibility testing
      axe.run(document, request.config)
        .then(function (results) {
          // Send the test results back to the extension popup
          chrome.runtime.sendMessage({ action: 'accessibilityTestResults', results });
        });
    }
  });
};

// Run accessibility tests
const runAccessibilityTest = function (config) {
    return new Promise(function (resolve) {
      axe.run(document, config, function (err, results) {
        resolve(results);
      });
    });
  };
  

(document.head || document.documentElement).appendChild(script);
