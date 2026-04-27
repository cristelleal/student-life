import { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
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
    <ScrollView
      className="flex-1 bg-[#E5FCFF]"
      contentContainerClassName="flex-1 justify-center items-center px-4 py-12"
      showsVerticalScrollIndicator={false}
    >
      <View
        className="w-full max-w-md bg-white rounded-3xl shadow-lg"
        style={{ padding: Platform.OS === 'web' ? 32 : 24 }}
      >
        {/* Header */}
        <View className="items-center mb-10">
          <View
            className="rounded-2xl bg-[#08415C] items-center justify-center mb-4"
            style={{
              width: Platform.OS === 'web' ? 64 : 80,
              height: Platform.OS === 'web' ? 64 : 80,
            }}
          >
            <Text
              style={{ fontSize: Platform.OS === 'web' ? 24 : 30 }}
              className="text-white font-bold"
            >
              SL
            </Text>
          </View>
          <Text
            style={{ fontSize: Platform.OS === 'web' ? 28 : 34 }}
            className="text-[#08415C] font-bold"
          >
            Connexion
          </Text>
          <Text className="text-gray-400 text-sm mt-1">
            Content de te revoir !
          </Text>
        </View>

        {/* Inputs */}
        <View className="gap-3">
          <TextInput
            className="bg-[#E5FCFF] border border-gray-200 rounded-xl px-4 text-gray-800"
            style={{
              paddingVertical: Platform.OS === 'web' ? 14 : 18,
              fontSize: Platform.OS === 'web' ? 14 : 16,
            }}
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
            className="bg-[#E5FCFF] border border-gray-200 rounded-xl px-4 text-gray-800"
            style={{
              paddingVertical: Platform.OS === 'web' ? 14 : 18,
              fontSize: Platform.OS === 'web' ? 14 : 16,
            }}
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
          className={`bg-[#08415C] rounded-xl items-center mt-6 ${loading ? 'opacity-60' : ''}`}
          style={{ paddingVertical: Platform.OS === 'web' ? 14 : 18 }}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text
            style={{ fontSize: Platform.OS === 'web' ? 14 : 17 }}
            className="text-white font-semibold"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Text>
        </TouchableOpacity>

        {/* Lien */}
        <View className="items-center mt-6">
          <Link href="/(auth)/register">
            <Text className="text-[#08415C] text-sm">
              Pas encore de compte ?{' '}
              <Text className="font-bold">S&apos;inscrire</Text>
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
