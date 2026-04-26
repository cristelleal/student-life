import { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { authClient } from '../../lib/auth-client';
import { useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

export default function RegisterScreen() {
  const lastNameRef = useRef<RNTextInput>(null);
  const emailRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);
  const confirmPasswordRef = useRef<RNTextInput>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = useCallback(async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (authClient.signUp.email as any)({
      email,
      password,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
    });
    setLoading(false);

    if (error) {
      Alert.alert("Erreur d'inscription", error.message);
      return;
    }
    console.log('Inscrit :', data);
    router.replace('/(tabs)');
  }, [firstName, lastName, email, password, confirmPassword]);

  return (
    <ScrollView
      className="flex-1 bg-[#E5FCFF]"
      contentContainerClassName="justify-center px-6 py-12"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="items-center mb-10">
        <View className="w-16 h-16 rounded-2xl bg-[#08415C] items-center justify-center mb-4">
          <Text className="text-white text-2xl font-bold">SL</Text>
        </View>
        <Text className="text-[#08415C] text-3xl font-bold">
          Créer un compte
        </Text>
        <Text className="text-gray-400 text-sm mt-1">
          Rejoins Student Life !
        </Text>
      </View>

      {/* Formulaire */}
      <View className="gap-3">
        <View className="flex-row gap-3">
          <TextInput
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-base"
            placeholder="Prénom"
            placeholderTextColor="#9ca3af"
            value={firstName}
            onChangeText={setFirstName}
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current?.focus()}
            submitBehavior="submit"
          />
          <TextInput
            ref={lastNameRef}
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-base"
            placeholder="Nom"
            placeholderTextColor="#9ca3af"
            value={lastName}
            onChangeText={setLastName}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            submitBehavior="submit"
          />
        </View>

        <TextInput
          ref={emailRef}
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
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          submitBehavior="submit"
        />

        <TextInput
          ref={confirmPasswordRef}
          className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-base"
          placeholder="Confirmer le mot de passe"
          placeholderTextColor="#9ca3af"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleRegister}
        />
      </View>

      {/* Bouton */}
      <TouchableOpacity
        className={`bg-[#08415C] rounded-xl py-4 items-center mt-6 ${loading ? 'opacity-60' : ''}`}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text className="text-white font-semibold text-base">
          {loading ? 'Inscription...' : "S'inscrire"}
        </Text>
      </TouchableOpacity>

      {/* Lien login */}
      <View className="items-center mt-6">
        <Link href="/(auth)/login">
          <Text className="text-[#08415C] text-sm">
            Déjà un compte ? <Text className="font-bold">Se connecter</Text>
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}
