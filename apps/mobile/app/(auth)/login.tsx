import { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { authClient } from '../../lib/auth-client';
import { useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

export default function LoginScreen() {
  const passwordRef = useRef<RNTextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    setLoading(true);
    const { data, error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Erreur de connexion', error.message);
      return;
    }
    console.log('Connecté :', data);
    router.replace('/(tabs)');
  }, [email, password]);

  return (
    <View className="flex-1 bg-[#E5FCFF] justify-center px-6">
      {/* Logo / Header */}
      <View className="items-center mb-10">
        <View className="w-16 h-16 rounded-2xl bg-[#08415C] items-center justify-center mb-4">
          <Text className="text-white text-2xl font-bold">SL</Text>
        </View>
        <Text className="text-[#08415C] text-3xl font-bold">Connexion</Text>
        <Text className="text-gray-400 text-sm mt-1">
          Content de te revoir !
        </Text>
      </View>

      {/* Formulaire */}
      <View className="gap-3">
        <TextInput
          className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-base"
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          submitBehavior="submit"
        />
        <TextInput
          ref={passwordRef}
          className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-base"
          placeholder="Mot de passe"
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />
      </View>

      {/* Bouton */}
      <TouchableOpacity
        className={`bg-[#08415C] rounded-xl py-4 items-center mt-6 ${loading ? 'opacity-60' : ''}`}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white font-semibold text-base">
          {loading ? 'Connexion...' : 'Se connecter'}
        </Text>
      </TouchableOpacity>

      {/* Lien register */}
      <View className="items-center mt-6">
        <Link href="/(auth)/register">
          <Text className="text-[#08415C] text-sm">
            Pas encore de compte ?{' '}
            <Text className="font-bold">S&apos;inscrire</Text>
          </Text>
        </Link>
      </View>
    </View>
  );
}
