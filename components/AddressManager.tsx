
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import AddressInput from './AddressInput'
import AddressList from './AddressList'

export default function AddressManager() {
    
const [addresses, setAddresses] = useState<string[]>([])

const handleAddAddress = (address: string) => {
    if (address.trim() !== "") {
    setAddresses((prevAddresses) => [...prevAddresses, address])
    }
}

return (
    <View style={styles.container}>
    <AddressInput onAddAddress={handleAddAddress} />
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
