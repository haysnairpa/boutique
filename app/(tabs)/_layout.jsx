import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  return (
    <>
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}