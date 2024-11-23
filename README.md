# Welcome to Routery Expo app

This project involves transforming an address management and route optimization system into a mobile application using React Native. Below is an explanation of each component, their functionalities, and how they contribute to the overall application:

Components:

index.tsx

This is the main screen of the app, where it imports and renders other components such as AppThemeProvider, AddressManager, MapComponent, and OptimizedRoute.

State:
location: Stores the current selected address' latitude and longitude.
addresses: An array of added addresses with their respective coordinates.

Functions:
handleAddAddress: Adds a new address and its coordinates to the state.
resetButton: Clears the list of addresses and the current location.
AddressInput.tsx

This component allows users to input and select addresses.

State:
address: The current text input for the address.
suggestions: Holds the suggestions returned from the Google Places API.
selectedPlaceId: Tracks the place ID of the selected address.

Functions:
fetchSuggestions: Fetches address suggestions based on the input.
fetchPlaceDetails: Fetches detailed information about a place based on its place ID.
handleAddAddress: Adds the selected address and coordinates to the main component state.

AddressList.tsx

Displays a list of added addresses.

State:

This component receives an array of addresses as props and renders them.
Functionality:
It lists the addresses that the user has added and provides feedback if no addresses are present.

AddressManager.tsx

Manages the addresses by combining AddressInput and AddressList.

State:
addresses: Keeps track of the list of addresses entered by the user.

Functions:
handleAddAddress: Adds new addresses to the list and updates the parent component.

OptimizedRoute.tsx

This component calculates the optimized route for the list of added addresses using the Google Maps Directions API.

State:
googleMapsLink: Holds the generated Google Maps link for the optimized route.

Functions:
getOptimizedRoute: Uses Google Maps API to calculate the optimized route.
openGoogleMaps: Opens the route in Google Maps if a link is generated.

Error Handling:
Displays an error if less than two addresses are added or if there's a failure in fetching the route.

How It Works:

Adding Addresses:

Users can type an address in the AddressInput component. The app uses the Google Places API to fetch suggestions and allows the user to select one. After selecting an address, its coordinates are fetched using the Place Details API and passed to the parent component to be added to the list.
Displaying Addresses:

The AddressList component shows all the addresses added by the user. If no addresses are added, it displays a message indicating so.
Route Optimization:

When the user adds at least two addresses, they can press the "Get Optimized Route" button to calculate the most efficient route for all the addresses. The app uses the Google Maps Directions API to retrieve and display the optimized route.
A link to open the route in Google Maps is also provided.
Reset Functionality:

A button is provided to reset the added addresses and the current location.

Next Steps and Improvements:
Styling:

You could improve the overall app's design by adding more styles, such as customizing the map component and enhancing the UI of the address list.
Error Handling:

Additional error handling could be implemented to handle network issues, invalid addresses, or other edge cases.
User Authentication:

Adding user authentication (e.g., using Firebase or other providers) to save addresses for later use could enhance the app.
Map Integration:

The MapComponent could be integrated more effectively by displaying the route on the map.

## Get started

1. Install dependencies

   ```bash
   npm install
   npm install @react-native-google-signin/google-signin 
   npx expo install react-native-maps
   npm install axios
   npm install react-native-maps @react-native-maps/polyline
   npm install --save-dev @types/react-native-maps
   npm install react-native-geolocation-service react-native-maps
   ```

2. Start the app

   ```bash
    npx expo start
   ```


