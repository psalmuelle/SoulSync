import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

export default function Splash({
  onAnimationFinish,
}: {
  onAnimationFinish: () => void;
}) {
  return (
    <View style={styles.container}>
      {/* Top right image */}
      <Image
        source={require("@/assets/icons/splash-top-flower.png")}
        style={styles.topRight}
        contentFit="cover"
        transition={2500}
      />
      {/* Bottom left image */}
      <Image
        source={require("@/assets/icons/splash-bottom-flower.png")}
        style={styles.bottomLeft}
        contentFit="cover"
        transition={2500}
      />
      <LottieView
        source={require("@/assets/animations/splash.json")}
        autoPlay={true}
        loop={false}
        resizeMode="cover"
        onAnimationFinish={onAnimationFinish}
        style={{ width: 300, height: 300 }}
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
  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  bottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
});
