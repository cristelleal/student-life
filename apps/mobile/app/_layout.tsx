import '../global';
import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { View, Image, Text } from 'react-native';
import icon from '../assets/icon.png';
import { authClient } from '../lib/auth-client';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
      setShowSplash(false);
      setIsReady(true);
    }
    prepare();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    async function checkSession() {
      const session = await authClient.getSession();
      if (session?.data?.user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    }
    checkSession();
  }, [isReady]);

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
