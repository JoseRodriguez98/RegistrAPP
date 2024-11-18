import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'RegistrAPP',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    BarcodeScanner: {
      cameraPermission: 'El acceso a la cámara es necesario para escanear códigos QR',
      presentationStyle: 'fullscreen',
    },
  },
};

export default config;
