import { useState } from "react"
import { View, TextInput, Button, StyleSheet, Keyboard, FlatList, TouchableOpacity, Text } from "react-native"


type AddressInputProps = {
  onAddAddress: (address: string, latitude: number, longitude: number) => void
}

export default function AddressInput({ onAddAddress }: AddressInputProps) {
  
  const [address, setAddress] = useState('')
  const [suggestions, setSuggestions] = useState<{ description: string, place_id: string }[]>([])
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null) 

  const GOOGLE_PLACES_API_KEY = "AIzaSyCahYAqH9bRIufClX3irVl7UqSitCFDsC8"

  const fetchSuggestions = async (input: string) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${GOOGLE_PLACES_API_KEY}`

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Extract address predictions
      const predictions = data.predictions.map((prediction: any) => ({
        description: prediction.description,
        place_id: prediction.place_id
      }))
      setSuggestions(predictions);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  }

  const fetchPlaceDetails = async (placeId: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.result.geometry.location;
        return location;
      } else {
        console.error("Error fetching place details:", data.status);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }

    return null;
  }

  const handleAddAddress = async () => {
    if(address.trim() && selectedPlaceId) {
      const location = await fetchPlaceDetails(selectedPlaceId)
      onAddAddress(address, location.lat, location.lng)
      setAddress('')
      setSuggestions([])
      Keyboard.dismiss()
    }
  }

  const handleSelectSuggestion = (selectedAddress: string, placeId: string) => {
    setAddress(selectedAddress)
    setSuggestions([])
    setSelectedPlaceId(placeId)
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter address"
        value={address}
        onChangeText={(text) => {
          setAddress(text);
          fetchSuggestions(text);
        }}
        style={styles.input}
      />
      {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectSuggestion(item.description, item.place_id)}>
                <Text style={styles.suggestion}>{item.description}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsContainer}
          />
        )}
      <Button title="Add Address" onPress={handleAddAddress} disabled={!address.trim()} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: { 
    flexDirection: "row", 
    margin: 10,
  },
  input: { 
    flex: 1, 
    borderBottomWidth: 0.2, 
    marginRight: 10, 
    padding: 5,
    borderBottomColor: "#ccc",
    color: "grey"

  },
  suggestionsContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    borderRadius: 5,
    maxHeight: 150,
    elevation: 5,
    
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
})