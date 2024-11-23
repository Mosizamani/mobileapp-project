import React, { useState } from "react";
import { View, Button, Alert, Text, Linking, TouchableOpacity } from "react-native";
import axios from "axios";

type Address = {
address: string;
latitude: number;
longitude: number;
};

type OptimizedRouteProps = {
addresses: Address[];
};

const GOOGLE_MAPS_API_KEY = "AIzaSyCahYAqH9bRIufClX3irVl7UqSitCFDsC8";

export default function OptimizedRoute({ addresses }: OptimizedRouteProps) {

const [googleMapsLink, setGoogleMapsLink] = useState<string | null>(null);

const getOptimizedRoute = async () => {
    if (addresses.length < 2) {
    Alert.alert("Error", "Please add at least two addresses to calculate a route.");
    return;
    }

    const origin = `${addresses[0].latitude},${addresses[0].longitude}`;
    const destination = `${addresses[addresses.length - 1].latitude},${addresses[addresses.length - 1].longitude}`;
    const waypoints = addresses
    .slice(1, addresses.length - 1)
    .map((addr) => `${addr.latitude},${addr.longitude}`)
    .join("|");

    try {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json`,
        {
        params: {
            origin,
            destination,
            waypoints: `optimize:true|${waypoints}`,
            key: GOOGLE_MAPS_API_KEY,
        },
        }
    );

    const generatedLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        origin
    )}&destination=${encodeURIComponent(destination)}&waypoints=${encodeURIComponent(
        "optimize:true|" + waypoints
    )}&travelmode=driving`

    setGoogleMapsLink(generatedLink)

    const route = response.data.routes[0].legs
    Alert.alert("Optimized Route:", JSON.stringify(route, null, 2))
    } catch (error) {
    Alert.alert("Error", "Failed to fetch the route. Please try again.")
    console.error(error)
    }
}

console.log(googleMapsLink)

const openGoogleMaps = () => {
    if (googleMapsLink) {
    Linking.openURL(googleMapsLink).catch((err) => console.error("Failed to open link:", err))
    }
}

return (
    <View>
    {googleMapsLink && (
        <TouchableOpacity onPress={openGoogleMaps}>
        <Text style={{ color: "red", marginTop: 5, marginBottom: 5, textAlign: "center" }}>Click to Open Route in Google Maps</Text>
        </TouchableOpacity>
    )}
    <Button title="Get Optimized Route" onPress={getOptimizedRoute} />
    </View>
)
}

