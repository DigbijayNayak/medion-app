import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.medionptg.app',
  appName: 'MediON',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    "url": "http://172.17.6.27:8100",
    "cleartext": true
  }
};

export default config;
