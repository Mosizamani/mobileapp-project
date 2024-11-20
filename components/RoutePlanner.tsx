import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import MapView, { Marker, Polyline } from "react-native-maps";

// Define types for address and props
type Address = {
address: string;
latitude: number;
longitude: number;
};

type RoutePlannerProps = {
currentLocation: { latitude: number; longitude: number };
addresses: Address[];
};

const GOOGLE_MAPS_API_KEY = 'AIzaSyCahYAqH9bRIufClX3irVl7UqSitCFDsC8' // Replace with your Google API key

const RoutePlanner: React.FC<RoutePlannerProps> = ({ currentLocation, addresses }) => {
const [route, setRoute] = useState<any>(null); // Route data (polyline and directions)
const [isLoading, setIsLoading] = useState(false); // Loading state for API call

useEffect(() => {
    if (currentLocation && addresses.length > 0) {
    getRoute();
    }
}, [currentLocation, addresses]);

// Function to get the optimal route
const getRoute = async () => {
    if (!currentLocation || addresses.length === 0) {
    Alert.alert("Error", "Please ensure the current location and addresses are available.");
    return;
    }

    setIsLoading(true);

    const waypoints = addresses
    .map((address) => `${address.latitude},${address.longitude}`)
    .join("|");

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${addresses[addresses.length - 1].latitude},${addresses[addresses.length - 1].longitude}&waypoints=optimize:true|${waypoints}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
    const response = await axios.get(url);
    const polyline = response.data.routes[0].overview_polyline.points;
    setRoute({ polyline });
    } catch (error) {
    console.error("Error fetching directions", error);
    Alert.alert("Error", "Could not fetch directions.");
    } finally {
    setIsLoading(false);
    }
}

// Decode the polyline points returned by Google Maps API
const decodePolyline = (encoded: string) => {
    let index = 0;
    const coordinates: any[] = [];
    let latitude = 0;
    let longitude = 0;

    while (index < encoded.length) {
    let byte: number;
    let shift = 0;
    let result = 0;
    do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
    } while (byte >= 0x20);

    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    latitude += deltaLat;

    shift = 0;
    result = 0;
    do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
    } while (byte >= 0x20);

    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    longitude += deltaLng;

    coordinates.push({ latitude: latitude / 1e5, longitude: longitude / 1e5 });
    }

    return coordinates;
};

return (
    <View style={styles.container}>
    {isLoading ? (
        <Text>Loading route...</Text>
    ) : (
        <>
        <Button title="Get Route" onPress={getRoute} />
        {route && (
            <MapView
            style={styles.map}
            initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            >
            <Marker coordinate={currentLocation} title="Current Location" />
            {addresses.map((address, index) => (
                <Marker key={index} coordinate={address} title={`Stop ${index + 1}`} />
            ))}
            <Polyline
                coordinates={decodePolyline(route.polyline)}
                strokeColor="#000"
                strokeWidth={3}
            />
            </MapView>
        )}
        </>
    )}
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 10,
},
map: {
    flex: 1,
    marginTop: 20,
},
});

export default RoutePlanner;
