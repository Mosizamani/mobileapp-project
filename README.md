# Welcome to Routery Expo app

This is an application that can optimize your route based on your location and list of your destinations.

App structure:

- AddressInput: For adding new addresses.
- AddressList: Displays the list of added addresses.
- OptimizeButton: Triggers the optimization process.
- MapViewComponent: Displays a map with markers for each address.
- googleApiUtils: Contains utility functions for fetching geolocation data and calculating optimized routes.
- This structure separates concerns into specific components, making your app easier to maintain and extend.

## Get started

1. Install dependencies

   ```bash
   npm install
   npm install @react-native-google-signin/google-signin 
   npx expo install react-native-maps
   npm install axios
   npm install react-native-maps @react-native-maps/polyline
   npm install --save-dev @types/react-native-maps
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
