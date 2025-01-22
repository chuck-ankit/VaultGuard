document.getElementById('add-password').addEventListener('click', () => {
    chrome.tabs.create({ url: 'options/options.html' });
  });
  
  // Load saved passwords
  chrome.storage.sync.get(['passwords'], (result) => {
    const passwordList = document.getElementById('password-list');
    if (result.passwords) {
      result.passwords.forEach((password) => {
        const div = document.createElement('div');
        div.textContent = `${password.site}: ${password.username}`;
        passwordList.appendChild(div);
      });
    }
  });