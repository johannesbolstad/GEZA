# GEZA application

## About Geza

Geza is a mobile application which has been developed by G10-GENBI as part of the course Informatics Project II (IT2901) at Norwegian University of Science and Technology (NTNU). The application aims to help refugees to better navigate through the Norwegian society and system.

Geza is written with React Native as the frontend framework and Firebase as a Backend-as-a-Service.

## Prerequisites

- npm
- Node version 12 and greater
- Smart phone: Android Lollipop (5) and greater or iOS 11 or greater

## How to run the application

After the project has been cloned into your device:

1. Navigate to the project with **cd it2901-genbi/frontend**
2. Run **npm install --global expo-cli**
3. Run **npm install** in the frontend folder.
4. Run **npm start**

## How to open the application on your phone

Make sure that the app "Expo Go" has been downloaded from Apple Store or Play Store and Expo runs in **tunnel** in Expo Dev Tools

### iOS devices

1. Open the camera for iOS device
2. Scan the QR code that is in the terminal or in Expo Dev Tools

### Android devices

1. Open the Expo Go app
2. Click on **Scan QR Code** under projects
3. Scan the **QR code** that is in the terminal or in Expo Dev Tools

## Code quality

The project is configured with ESLint and Prettier. This will ensure that the code follows a common standard and keep the code readable. Prettier can be run with following command in the frontend module: **npm run prettier:write**.
