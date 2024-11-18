// components/AppThemeProvider.tsx
import React, { useEffect } from 'react'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
const colorScheme = useColorScheme()
const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
});

useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
}, [loaded])

return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    {children}
    </ThemeProvider>
)
}