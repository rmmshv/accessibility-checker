// Handle messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'accessibilityTestResults') {
      displayResults(request.results);
    }
  });
  
  // Send a message to the content script to run accessibility tests
  document.getElementById('runTestsButton').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'runAccessibilityTest', config: {} });
    });
  });
  
  // Display the accessibility test results in the popup
  function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = JSON.stringify(results, null, 2);
  }
  