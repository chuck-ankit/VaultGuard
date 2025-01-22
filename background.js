// background.js

// Listen for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log("VaultGuard extension installed.");
  });
  
  // Listen for messages from other parts of the extension (e.g., popup, content scripts)
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "savePassword") {
      // Save the password to chrome.storage
      chrome.storage.sync.get(['passwords'], (result) => {
        const passwords = result.passwords || [];
        passwords.push(message.data);
        chrome.storage.sync.set({ passwords }, () => {
          console.log("Password saved:", message.data);
          sendResponse({ success: true });
        });
      });
      return true; // Indicates that sendResponse will be called asynchronously
    }
  
    if (message.action === "getPasswords") {
      // Retrieve passwords from chrome.storage
      chrome.storage.sync.get(['passwords'], (result) => {
        sendResponse({ passwords: result.passwords || [] });
      });
      return true; // Indicates that sendResponse will be called asynchronously
    }
  });
  
  // Example: Listen for clicks on the extension icon
  chrome.action.onClicked.addListener((tab) => {
    console.log("Extension icon clicked.");
    // You can open the popup programmatically or perform other actions
  });