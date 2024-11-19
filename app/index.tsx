import React, { useState } from 'react'
import axios from 'axios'
import 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppThemeProvider from '@/components/AddThemeProvider'
import AddressManager from '@/components/AddressManager'
import OptimizeButton from '@/components/OptimizeButton'
import MapComponent from '@/components/MapComponent'


export default function index() {

  const [locations, setLocations] = useState<{ lat: number; lng: number; address: string }[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [optimizedRoute, setOptimizedRoute] = useState<{ lat: number; lng: number }[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);


  const handleAddAddress = (address: string, latitude: number, longitude: number) => {
    setLocation({ lat: latitude, lng: longitude })

    console.log("Adding address:", address, latitude, longitude)
  }

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
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppThemeProvider>
        <AddressManager onAddLocation={handleAddAddress} />
        {location && (
        <MapComponent latitude={location.lat} longitude={location.lng} />)}
        <OptimizeButton onOptimize={handleOptimizeRoute}/>
      </AppThemeProvider>
    </SafeAreaView>
  )
}