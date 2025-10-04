import Splash from "@/components/ui/Splash";
import { storage } from "@/lib/mmkvStorage";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View } from "react-native";

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = React.useState(false);
  const router = useRouter();
  const isLoggedIn = false; // Replace with actual authentication logic
  const hasOnboarded = storage.getBoolean("hasOnboarded");

  React.useEffect(() => {
    async function checkOnboardingStatus() {
      if (!isAppReady) return;
      if (!hasOnboarded && !isLoggedIn) {
        router.replace("/onboarding");
        return;
      }
    }
    checkOnboardingStatus();
  }, [router, isAppReady, isLoggedIn]);

  if (!isAppReady) {
    return <Splash onAnimationFinish={() => setIsAppReady(true)} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="create-account" />
          <Stack.Screen name="onboarding" />
        </Stack.Protected>
      </Stack>
    </View>
  );
}
