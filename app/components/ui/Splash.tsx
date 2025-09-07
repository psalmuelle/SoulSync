import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

export default function Splash({
  onAnimationFinish,
}: {
  onAnimationFinish: () => void;
}) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/animations/splash.json")}
        autoPlay
        loop={true}
        resizeMode="contain"
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbefe7",
  },
});
