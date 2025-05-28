import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '@/context/login/login.context';
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';

import { useColorScheme } from '@/components/useColorScheme';
import { darkTheme, lightTheme } from '@/theme/theme.global';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // Mover a lógica do tema para DENTRO desta função
  const colorScheme = useColorScheme();

  // Agora as variáveis estão no escopo correto
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const restyleTheme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <AuthProvider>
      <ThemeProvider value={navigationTheme}>
        <RestyleThemeProvider theme={restyleTheme}>
          <Stack>
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
          </Stack>
        </RestyleThemeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}