import { Stack } from "expo-router";
import * as React from "react";
import Splash from "./components/ui/Splash";

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = React.useState(false);
  if (!isAppReady) {
    return <Splash onAnimationFinish={() => setIsAppReady(false)} />;
  }
  return <Stack />;
}
