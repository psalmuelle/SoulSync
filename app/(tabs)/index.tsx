import { useRouter, Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to SoulSync!</Text>
      <Pressable onPress={() => router.push("/onboarding")}>
        <Text>Go To Onboarding</Text>
      </Pressable>

      <Link href={"/onboarding"}>
        <Text>Go To Onboarding</Text>
      </Link>
    </View>
  );
}
