
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import AddressInput from './AddressInput'
import AddressList from './AddressList'

type AddressInputProps = {
    onAddLocation: (address: string, latitude: number, longitude: number) => void
}

export default function AddressManager({ onAddLocation }: AddressInputProps) {
    
const [addresses, setAddresses] = useState<string[]>([])

const handleAddAddress = (address: string, latitude: number, longitude: number) => {
    if (address.trim() !== "") {
    setAddresses((prevAddresses) => [...prevAddresses, address])
    onAddLocation(address, latitude, longitude)
    }
}

return (
    <View style={styles.container}>
    <AddressInput onAddAddress={(address: string, latitude: number, longitude: number) => handleAddAddress(address, latitude, longitude)} />
    <AddressList addresses={addresses} />
    </View>
)
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 10,
},
})
