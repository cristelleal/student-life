import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: 'http://192.168.1.129:3001', //En local donc modifier avec son ip sur windows : ipconfig sur linux : ifconfig
});
