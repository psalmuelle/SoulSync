import Button from "@/components/ui/Button";
import DashedOTPInput from "@/components/ui/DashedOTPInput";
import { Colors } from "@/constants/Color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CodeVerification() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    user_process: string;
    email: string;
  }>();

  const handleBack = () => {
    router.back();
  };
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.topBar}>
        <Pressable onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.grey9} />
        </Pressable>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {params.user_process === "reset_password"
            ? "Code Verification"
            : "We're making sure it's really you."}
        </Text>
        <Text style={styles.headerSubText}>
          {params.user_process === "reset_password"
            ? `Enter 6 digit code sent to ${params.email}`
            : `A 6 digit code was sent to ${params.email}. Enter the code to continue.`}
        </Text>
      </View>
      <View style={styles.form}>
        <DashedOTPInput />

        <View>
          <Text>Didn't get the code? Resend Code.</Text>
        </View>
      </View>
      <Button onPress={() => {}}>
        <Text style={styles.btnText}>Send Reset Link</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF9F6",
  },
  topBar: {
    alignItems: "flex-start",
    marginBottom: 8,
  },
  backBtn: {
    paddingVertical: 8,
    paddingLeft: 0,
    paddingRight: 16,
    borderRadius: 100,
  },
  header: {
    marginBottom: 24,
  },
  headerText: {
    fontFamily: "Recoleta",
    fontSize: 32,
    fontWeight: "500",
    color: Colors.light.grey11,
  },
  headerSubText: {
    fontFamily: "DMSans",
    fontSize: 16,
    color: Colors.light.grey5,
    marginTop: 4,
  },
  form: {
    flex: 1,
    marginTop: 40,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "DMSans",
  },
});
