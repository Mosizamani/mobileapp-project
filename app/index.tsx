import React, { useState } from 'react'
import 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppThemeProvider from '@/components/AddThemeProvider'
import AddressManager from '@/components/AddressManager'
import MapComponent from '@/components/MapComponent'
import OptimizedRoute from '@/components/OptimizedRoute'


export default function index() {

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [addresses, setAddresses] = useState<{ address: string; latitude: number; longitude: number }[]>([])

  const handleAddAddress = (address: string, latitude: number, longitude: number) => {
    setLocation({ lat: latitude, lng: longitude })
    setAddresses((prev) => [...prev, { address, latitude, longitude }])

    console.log("Adding address:", address, latitude, longitude)
    console.log()
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppThemeProvider>
        <AddressManager onAddLocation={handleAddAddress} />
        {location && (
        <MapComponent latitude={location.lat} longitude={location.lng} />)}
        {addresses.length > 1 && <OptimizedRoute addresses={addresses} />}
      </AppThemeProvider>
    </SafeAreaView>
  )
}