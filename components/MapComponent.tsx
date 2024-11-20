import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type MapComponentProps = {
latitude: number;
longitude: number;
}

export default function MapComponent({ latitude, longitude }: MapComponentProps) {
    const mapRef = useRef<MapView | null>(null)
    useEffect(() => {
        if (mapRef.current) {
          // Use animateToRegion to smoothly move the map to the new location
            mapRef.current.animateToRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
        });
        }
    }, [latitude, longitude])
return (
    
    <View style={styles.container}>
    <MapView
    ref={mapRef}
        style={styles.map}
        region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922, // Adjust the zoom level
            longitudeDelta: 0.0421, // Adjust the zoom level
        }}
    >
        <Marker coordinate={{ latitude, longitude }} title="Location" />
    </MapView>
    </View>
)
}

const styles = StyleSheet.create({
container: {
    flex: 1,
},
map: {
    flex: 1,
},
});
