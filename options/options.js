import { encryptData, decryptData } from "../scripts/encryption.js";

const ENCRYPTION_KEY = "test-encryption-key-123";

document.getElementById('password-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const site = document.getElementById('site').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Encrypt the password
  const encryptedPassword = await encryptData(password, ENCRYPTION_KEY);

  // Save the encrypted password to chrome.storage
  chrome.storage.sync.get(['passwords'], (result) => {
    const passwords = result.passwords || [];
    passwords.push({ site, username, password: encryptedPassword });
    chrome.storage.sync.set({ passwords }, () => {
      alert('Password saved!');
      window.close();
    });
  });
});

// Example: Decrypt a password
chrome.storage.sync.get(['passwords'], async (result) => {
  if (result.passwords) {
    const decryptedPasswords = await Promise.all(
      result.passwords.map(async (item) => {
        const decryptedPassword = await decryptData(item.password, ENCRYPTION_KEY);
        return { ...item, password: decryptedPassword };
      })
    );
    console.log("Decrypted Passwords:", decryptedPasswords);
  }
});