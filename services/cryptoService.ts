import CryptoJS from "crypto-js";

export const encryptData = (text: string, key: string): string => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const decryptData = (ciphertext: string, key: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return "Invalid Key or Data";
  }
};
