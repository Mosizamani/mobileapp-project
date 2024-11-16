import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

type AddressListProps = {
  addresses: string[]
}

export default function AddressList({ addresses }: AddressListProps) {
  if (addresses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No addresses added yet.</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
    {addresses.map((address, index) => (
      <View key={index} style={styles.item}>
        <Text>{address}</Text>
      </View>
    ))}
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  emptyContainer: { alignItems: 'center', marginTop: 20 },
  emptyText: { color: '#888' },
});