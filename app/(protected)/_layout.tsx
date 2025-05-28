import { Stack, Redirect } from 'expo-router';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '@/context/login/login.context';




export default function ProtectedLayout() {
  const colorScheme = useColorScheme();
  const {isLogged , isReady} = useAuth();

  if(!isReady){
    return null;
  }

  if(!isLogged){
    return <Redirect href="/login" />;
  }

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />    
        <Stack.Screen name="+not-found" />
      </Stack>
  );
}
