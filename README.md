# Boutique App 👗

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- Firebase account

### Installation

1. Clone repository
   ```bash
   git clone https://github.com/haysnairpa/boutique.git
   cd boutique
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Firebase Setup
   ```bash
   # Copy template firebase config
   cp firebase.config.example.js firebase.config.js
   ```

4. Update Firebase credentials in `firebase.config.js`
   ```javascript
   const firebaseConfig = {
     apiKey: "xxx",
     authDomain: "xxx",
     projectId: "xxx",
     storageBucket: "xxx",
     messagingSenderId: "xxx",
     appId: "xxx"
   };
   ```
   > 📝 Contact maintainer to get valid Firebase credentials

5. Run the app
   ```bash
   npx expo start
   ```

## 📱 Running the App

After running `npx expo start`, you can open the app on:

- 📱 **Expo Go** - Scan QR code with Expo Go app
- 📱 **Android Emulator** - Press `a` in terminal
- 📱 **iOS Simulator** - Press `i` in terminal (macOS only)
- 🌐 **Web Browser** - Press `w` in terminal

## 🛠️ Tech Stack

- React Native
- Expo
- Firebase (Firestore)
- React Navigation
- Expo Router

## 📝 Features

- ✨ Product management (CRUD)
- 📸 Upload product photo
- 🔍 Product search
- 📱 Responsive design
- 🎨 Custom UI components

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 👥 Contact

Maintainer - [@haysnairpa](https://github.com/haysnairpa)

Project Link: [https://github.com/haysnairpa/boutique](https://github.com/haysnairpa/boutique)