# Secure Message Encryption App

A **React Native** application for securely encrypting and decrypting messages using a secret key. The app provides a simple interface for users to input messages, encrypt them with a custom key, and decrypt them when needed.

## Features

- **Encrypt Messages:** Securely encrypt text using a secret key.
- **Decrypt Messages:** Decrypt previously encrypted text.
- **Clipboard Support:** Copy encrypted or decrypted results to the clipboard.
- **Tab Navigation:** Toggle between encryption and decryption modes.
- **Responsive UI:** Designed with React Native Paper and optimized for mobile screens.

## Technologies Used

- **React Native**
- **TypeScript**
- **Expo** (for Clipboard API)
- **React Native Paper** (for UI components)

## Installation

### Prerequisites

Ensure you have **Node.js** and **Expo CLI** installed:

```sh
npm install -g expo-cli
```

### Clone the Repository

```sh
git clone https://github.com/froschi95/EncryptionApp.git
cd EncryptionApp
```

### Install Dependencies

```sh
npm install
```

### Run the App

```sh
npx expo start
```

## Usage

1. **Enter a message** in the input field.
2. **Enter a secret key** to encrypt or decrypt the message.
3. Click **Encrypt Message** to encrypt or **Decrypt Message** to decrypt.
4. Copy the result using the clipboard button.
5. Click **Clear All** to reset inputs.

## Project Structure

```
📂 crypt-rn
├── 📂 app
│   ├── Index.tsx         # Main screen
├── 📂 components
├── 📂 services
│   ├── cryptoService.ts  # Encryption & decryption logic
├── package.json
├── eas.json
├── app.json
├── README.md
```

## License

This project is open-source and available under the [MIT License](LICENSE).
