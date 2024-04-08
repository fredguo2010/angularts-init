import { Environment } from '@delon/theme';

export const environment = {
  production: true,
  useHash: true,
  socketurl: `ws://localhost:3000/api/realtime-data/echo`,
  api: {
    baseUrl: './api/',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  },
  enablePageTabView: false,
  captchaEnabled: true
} as Environment;
