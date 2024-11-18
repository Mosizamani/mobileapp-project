import React, { useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View } from "react-native";

type MapViewComponentProps = {
locations: { lat: number; lng: number; address: string }[];
currentLocation: { latitude: number; longitude: number } | null;
optimizedRoute: { lat: number; lng: number }[];
};

export default function MapViewComponent({ locations, currentLocation, optimizedRoute }: MapViewComponentProps) {
return (
    <View style={styles.container}>
    <MapView
        style={styles.map}
        initialRegion={{
        latitude: currentLocation?.latitude || 37.7749,
        longitude: currentLocation?.longitude || -122.4194,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        }}
    >
        {locations.map((location, index) => (
        <Marker
            key={index}
            coordinate={{ latitude: location.lat, longitude: location.lng }}
            title={location.address}
        />
        ))}
        {optimizedRoute.length > 0 && (
        <Polyline
            coordinates={optimizedRoute.map(point => ({
            latitude: point.lat,
            longitude: point.lng
            }))}
            strokeColor="#0000FF"
            strokeWidth={3}
        />
        )}
    </MapView>
    </View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, height: 400 },
map: { flex: 1 },
});
