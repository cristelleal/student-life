import '../global';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { View, Image, Text } from 'react-native';
import icon from '../assets/icon.png';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } finally {
        await SplashScreen.hideAsync();
        setTimeout(() => setShowSplash(false), 500);
      }
    }
    prepare();
  }, []);

  if (showSplash) {
    return (
      <View className="flex-1 bg-[#08415C] items-center justify-center gap-8">
        <View className="w-32 h-32 rounded-3xl bg-white/20 items-center justify-center">
          <Image source={icon} className="w-20 h-20" resizeMode="contain" />
        </View>
        <Text className="text-white text-3xl font-bold tracking-wide">
          Student Life
        </Text>
        <Text className="text-white/70 text-base">Ton compagnon étudiant</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
