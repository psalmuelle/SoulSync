import Splash from "@/components/ui/Splash";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View } from "react-native";

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = React.useState(false);
  if (!isAppReady) {
    return <Splash onAnimationFinish={() => setIsAppReady(true)} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
      </Stack>
    </View>
  );
}
