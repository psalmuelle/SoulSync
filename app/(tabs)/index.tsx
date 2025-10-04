import { storage } from "@/lib/mmkvStorage";
import { Link, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  // Delete Later
  async function clearLocalStorage() {
    storage.delete("hasOnboarded");
    alert("Local storage cleared!");
  }

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

      <Pressable onPress={clearLocalStorage}>
        <Text>Clear Local Storage</Text>
      </Pressable>

      <Link href={"/onboarding"}>
        <Text>Go To Onboarding</Text>
      </Link>
    </View>
  );
}
