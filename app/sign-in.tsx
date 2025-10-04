import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Color";
import { storage } from "@/lib/mmkvStorage";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      // For demo purposes, accept any email/password
      storage.set("isAuthenticated", true);
      storage.set("userEmail", email);
      setIsLoading(false);
      router.replace("/(tabs)");
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.grey9} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue your wellness journey
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>

          <Button onPress={handleLogin}>
            <Text style={styles.loginButtonText}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Text>
          </Button>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Link href="/create-account" style={styles.signupLink}>
              <Text style={styles.signupLinkText}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.lightOrange,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.light.grey11,
    fontFamily: "Recoleta",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.grey7,
    fontFamily: "DMSans",
    marginBottom: 40,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.grey11,
    fontFamily: "DMSans",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.grey4,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: "DMSans",
    backgroundColor: "white",
  },
  loginButton: {
    backgroundColor: Colors.light.grey11,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "DMSans",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: Colors.light.grey7,
    fontFamily: "DMSans",
  },
  signupLink: {
    marginLeft: 4,
  },
  signupLinkText: {
    fontSize: 14,
    color: Colors.light.grey11,
    fontWeight: "600",
    fontFamily: "DMSans",
  },
});
