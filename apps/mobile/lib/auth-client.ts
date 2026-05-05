import { createAuthClient } from 'better-auth/react';
import { Platform } from 'react-native';
import { secureStorage } from './secure-storage';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import type { auth } from '../../backend/api/src/lib/auth';

const BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3001'
    : 'http://10.147.233.212:3001'; // Modifier avec son IP : Windows -> ipconfig, Linux -> ifconfig

const ORIGIN =
  Platform.OS === 'web'
    ? 'http://localhost:8081'
    : 'http://10.147.233.212:8081';

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  storage: secureStorage,
  plugins: [inferAdditionalFields<typeof auth>()],
  fetchOptions: {
    headers: {
      Origin: ORIGIN,
    },
  },
});
