import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.barrowneuro.nccapp',
  appName: 'NCC Onboarding',
  webDir: 'out',
  server: {
    // Live URL — app always fetches latest content from Vercel
    // Replace this with your actual Vercel URL after deployment
    url: 'https://neuro-icu-app-build.vercel.app',
    cleartext: false,
    // Allow the WebView to use the Vercel-hosted app
    androidScheme: 'https',
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#ffffff',
    allowsLinkPreview: false,
    scrollEnabled: true,
  },
};

export default config;
