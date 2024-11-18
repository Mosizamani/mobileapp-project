import { useState } from "react"
import { View, TextInput, Button, StyleSheet, Keyboard } from "react-native"


type AddressInputProps = {
  onAddAddress: (address: string) => void
}

export default function AddressInput({ onAddAddress }: AddressInputProps) {
  const [address, setAddress] = useState('')

  const handleAddAddress = () => {
    if(address.trim()) {
      onAddAddress(address)
      setAddress('')
      Keyboard.dismiss()
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <Button title="Add Address" onPress={handleAddAddress} disabled={!address.trim()} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: { flexDirection: "row", margin: 10 },
  input: { flex: 1, borderBottomWidth: 1, marginRight: 10 },
})