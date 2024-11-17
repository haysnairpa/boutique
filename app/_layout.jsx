import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Helvetica": require("../assets/fonts/Helvetica.ttf"),
    "Helvetica-Bold": require("../assets/fonts/Helvetica-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      <Stack.Screen 
        name="addproduct" 
        options={{
          title: 'Tambah Produk',
          headerShown: false,
          presentation: 'modal'
        }}
      />
    </Stack>
  );
}
