import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import { useEffect } from 'react'
import 'react-native-reanimated'
import AddressInput from '@/components/AddressInput'
import { useColorScheme } from '@/hooks/useColorScheme'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AddressList from '@/components/AddressList'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  const addresses: string[] = []; // Define the addresses variable

  return (
    <SafeAreaView>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AddressInput onAddAddress={(address) => console.log(address)} />
        <AddressList addresses={addresses} />
      </ThemeProvider>
    </SafeAreaView>
  )
}
