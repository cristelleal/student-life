import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { authClient } from '../../lib/auth-client';

export default function ProfilScreen() {
  const handleLogout = async () => {
    const doLogout = async () => {
      await authClient.signOut();
      router.replace('/(auth)/login');
    };

    if (Platform.OS === 'web') {
      await doLogout();
    } else {
      Alert.alert('Déconnexion', 'Voulez-vous vraiment vous déconnecter ?', [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Se déconnecter',
          style: 'destructive',
          onPress: doLogout,
        },
      ]);
    }
  };

  return (
    <View className="flex-1 bg-[#E5FCFF] items-center justify-center gap-4">
      <Text className="text-[#08415C] text-xl font-bold">Mon Profil</Text>
      <Text className="text-gray-400">Bientôt disponible</Text>

      <TouchableOpacity
        className="bg-red-500 px-6 py-3 rounded-xl mt-8"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold">Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}
