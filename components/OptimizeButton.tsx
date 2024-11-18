import React from "react"
import { Button, View, StyleSheet } from "react-native"

type OptimizeButtonProps = {
onOptimize: () => void
}

export default function OptimizeButton({ onOptimize }: OptimizeButtonProps) {
return (
    <View style={styles.container}>
    <Button title="Optimize Route" onPress={onOptimize} />
    </View>
)
}

const styles = StyleSheet.create({
container: { margin: 10 },
})
