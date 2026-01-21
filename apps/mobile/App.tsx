import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { store } from '@/store';
import RootNavigator from '@/navigation/RootNavigator';
import { colors } from '@/utils/theme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts
        await Font.loadAsync({
          'Nunito-Regular': require('./src/assets/fonts/Nunito-Regular.ttf'),
          'Nunito-Medium': require('./src/assets/fonts/Nunito-Medium.ttf'),
          'Nunito-SemiBold': require('./src/assets/fonts/Nunito-SemiBold.ttf'),
          'Nunito-Bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
          'Nunito-ExtraBold': require('./src/assets/fonts/Nunito-ExtraBold.ttf'),
        });
      } catch (e) {
        console.warn('Error loading fonts:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar style="dark" backgroundColor={colors.background.primary} />
          <RootNavigator />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
