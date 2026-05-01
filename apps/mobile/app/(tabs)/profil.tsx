import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { authClient } from '../../lib/auth-client';
import { useEffect, useState } from 'react';

export default function ProfilScreen() {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [profilPicture, setProfilPicture] = useState<string | null>(null);

  useEffect(() => {
    async function loadSession() {
      const session = await authClient.getSession();
      setFirstName(session?.data?.user?.name?.split(' ')[0] ?? null);
      setLastName(session?.data?.user?.name?.split(' ')[1] ?? null);
      setEmail(session?.data?.user?.email ?? null);
      setProfilPicture(session?.data?.user?.image ?? null);
    }
    loadSession();
  }, []);
  const handleSave = () => {
    console.log('Sauvegarde :', firstName, lastName, email);
    // A changer : Il faut envoyer les données vers le backend
  };
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
    <View className="flex-1 bg-[#E5FCFF] items-center justify-center px-6">
      <Text className="text-[#08415C] text-xl font-bold m-2">Mon Profil</Text>
      {/* Image de profile */}
      {profilPicture ? (
        <Image
          source={{ uri: profilPicture }}
          className="w-24 h-24 rounded-full m-4"
        />
      ) : (
        <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center mb-4">
          <Text className="text-white text-xl font-bold">
            {firstName?.[0]}
            {lastName?.[0]}
          </Text>
        </View>
      )}
      <View className="flex-4 bg-[#E5FCFF] items-center px-6 w-full">
        <View className="bg-white rounded-2xl p-5 shadow-sm gap-4 w-full max-w-md">
          <Text className="text-[#08415C] font-bold text-lg">
            Informations personnelles
          </Text>

          {/* Prénom + Nom */}
          <View className="flex-row gap-3">
            <View className="flex-1 gap-1">
              <Text className="text-gray-500 text-xs font-medium ml-1">
                Prénom
              </Text>
              <TextInput
                className="bg-[#E5FCFF] border border-gray-200 rounded-xl px-4 text-gray-800 w-full"
                style={{
                  paddingVertical: Platform.OS === 'web' ? 8 : 12,
                  fontSize: Platform.OS === 'web' ? 10 : 12,
                }}
                placeholder="Prénom"
                placeholderTextColor="#9ca3af"
                value={firstName ?? ''}
                onChangeText={setFirstName}
              />
            </View>
            <View className="flex-1 gap-1 w-full max-w-md">
              <Text className="text-gray-500 text-xs font-medium ml-1">
                Nom
              </Text>
              <TextInput
                className="bg-[#E5FCFF] border border-gray-200 rounded-xl px-4 text-gray-800 w-full"
                style={{
                  paddingVertical: Platform.OS === 'web' ? 8 : 12,
                  fontSize: Platform.OS === 'web' ? 10 : 12,
                }}
                placeholder="Nom"
                placeholderTextColor="#9ca3af"
                value={lastName ?? ''}
                onChangeText={setLastName}
              />
            </View>
          </View>
          {/* Email */}
          <View className="gap-1">
            <Text className="text-gray-500 text-xs font-medium ml-1">
              Email
            </Text>
            <TextInput
              className="bg-[#E5FCFF] border border-gray-200 rounded-xl px-4 text-gray-800 w-full"
              style={{
                paddingVertical: Platform.OS === 'web' ? 8 : 12,
                fontSize: Platform.OS === 'web' ? 10 : 12,
              }}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              value={email ?? ''}
              onChangeText={setEmail}
            />
          </View>
          {/* Filière */}
          <View className="gap-1">
            <Text className="text-gray-500 text-xs font-medium ml-1">
              Filière
            </Text>
            <TextInput
              className="bg-[#E5FCFF] border border-gray-200 rounded-xl px-4 text-gray-800 w-full"
              style={{
                paddingVertical: Platform.OS === 'web' ? 8 : 12,
                fontSize: Platform.OS === 'web' ? 10 : 12,
              }}
              placeholder="Filière"
              placeholderTextColor="#9ca3af"
              value={lastName ?? ''}
              onChangeText={setLastName}
            />
          </View>
          {/* Niveau d&apos;étude */}
          <View className="gap-1">
            <Text className="text-gray-500 text-xs font-medium ml-1">
              Niveau d&apos;étude
            </Text>
            <TextInput
              className="bg-[#E5FCFF] border border-gray-200 rounded-xl px-4 text-gray-800 w-full"
              style={{
                paddingVertical: Platform.OS === 'web' ? 8 : 12,
                fontSize: Platform.OS === 'web' ? 10 : 12,
              }}
              placeholder="NiveauEtude"
              placeholderTextColor="#9ca3af"
              value={lastName ?? ''}
              onChangeText={setLastName}
            />
          </View>

          {/* Établissement */}
          <View className="gap-1">
            <Text className="text-gray-500 text-xs font-medium ml-1">
              Établissement
            </Text>
            <TextInput
              className="bg-[#E5FCFF] border border-gray-200 rounded-xl px-4 text-gray-800 w-full"
              style={{
                paddingVertical: Platform.OS === 'web' ? 8 : 12,
                fontSize: Platform.OS === 'web' ? 10 : 12,
              }}
              placeholder="Établissement"
              placeholderTextColor="#9ca3af"
              value={lastName ?? ''}
              onChangeText={setLastName}
            />
          </View>

          {/* Bouton */}
          <TouchableOpacity
            className="bg-[#08415C] rounded-xl items-center py-4 mt-2"
            onPress={handleSave}
          >
            <Text className="text-white font-semibold">Sauvegarder</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="bg-red-500 px-6 py-3 rounded-xl mt-8"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold">Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}
