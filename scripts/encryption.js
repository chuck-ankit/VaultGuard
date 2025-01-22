// Hardcoded encryption key for testing (not secure for production)
const ENCRYPTION_KEY = "test-encryption-key-123";

// Convert a string to an ArrayBuffer
function stringToArrayBuffer(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// Convert an ArrayBuffer to a string
function arrayBufferToString(buffer) {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

// Generate a key from a hardcoded passphrase
async function generateKey(passphrase) {
  return crypto.subtle.importKey(
    "raw",
    stringToArrayBuffer(passphrase),
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

// Encrypt data
async function encryptData(data, passphrase) {
  const key = await generateKey(passphrase);
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization Vector
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    stringToArrayBuffer(data)
  );

  return {
    iv: Array.from(iv),
    encryptedData: Array.from(new Uint8Array(encrypted)),
  };
}

// Decrypt data
async function decryptData(encryptedData, passphrase) {
  const key = await generateKey(passphrase);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(encryptedData.iv) },
    key,
    new Uint8Array(encryptedData.encryptedData)
  );

  return arrayBufferToString(decrypted);
}

// Export functions
export { encryptData, decryptData };