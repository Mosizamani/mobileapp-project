import React, { useState } from 'react'
import axios from 'axios'
import 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppThemeProvider from '@/components/AddThemeProvider'
import AddressManager from '@/components/AddressManager'
import OptimizeButton from '@/components/OptimizeButton'
import MapViewComponent from '@/components/MapViewComponent'


export default function index() {

  const [addresses, setAddresses] = useState<string[]>([]);
  const [locations, setLocations] = useState<{ lat: number; lng: number; address: string }[]>([]);
  const [optimizedRoute, setOptimizedRoute] = useState<{ lat: number; lng: number }[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleAddAddress = async (address: string) => {
    // Use Geocoding API to get lat and lng
    const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    );
    const result = response.data.results[0];
    const location = result.geometry.location;

    setLocations((prev) => [...prev, { lat: location.lat, lng: location.lng, address }]);
    setAddresses((prevAddresses) => [...prevAddresses, address]);
  };

  const handleOptimizeRoute = async () => {
    const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
    const waypoints = locations.map(loc => `${loc.lat},${loc.lng}`).join("|");

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${locations[0].lat},${locations[0].lng}&destination=${locations[locations.length - 1].lat},${locations[locations.length - 1].lng}&waypoints=optimize:true|${waypoints}&key=${API_KEY}`
    );

    const optimizedOrder = response.data.routes[0].waypoint_order;
    const route = response.data.routes[0].legs.flatMap((leg) =>
      leg.steps.map((step) => ({
        lat: step.end_location.lat,
        lng: step.end_location.lng
      }))
    );

    setOptimizedRoute(route);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppThemeProvider>
        <AddressManager />
        <OptimizeButton onOptimize={handleOptimizeRoute}/>
        <MapViewComponent locations={locations} currentLocation={currentLocation} optimizedRoute={optimizedRoute} />
      </AppThemeProvider>
    </SafeAreaView>
  )
}