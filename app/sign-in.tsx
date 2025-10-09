import Button from "@/components/ui/Button";
import InputField from "@/components/ui/Input";
import { Colors } from "@/constants/Color";
import { storage } from "@/lib/mmkvStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const { width } = Dimensions.get("window");

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Create refs for input fields
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = async () => {
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      // For demo purposes, accept any email/password
      storage.set("isAuthenticated", true);
      storage.set("userEmail", "f");
      setIsLoading(false);
      router.replace("/(tabs)");
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.description}>
            Sign in to continue your wellness journey
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                ref={emailRef}
                label="Email Address"
                placeholder="example@email.com"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                errorMsg={errors.email?.message}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                ref={passwordRef}
                label="Password"
                placeholder="minimum of 6 characters"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                textContentType="password"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSubmit(handleLogin)}
                errorMsg={errors.password?.message}
              />
            )}
            name="password"
          />

          <Link href={"/forgot-password"} asChild>
            <Pressable style={styles.fpContainer}>
              <Text style={styles.fpText}>Forgot Password?</Text>
            </Pressable>
          </Link>

          <Button onPress={handleSubmit(handleLogin)}>
            <Text style={styles.loginButtonText}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Text>
          </Button>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account yet?{" "}
            <Link href="/create-account" style={styles.signupSpan}>
              Sign Up
            </Link>
          </Text>
        </View>

        <View style={styles.socialContainer}>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialBtnContainer}>
            <Button
              variant="secondary"
              style={styles.btnExtended}
              onPress={() => {}}
            >
              <View style={styles.socialBtn}>
                <Image
                  source={require("@/assets/icons/google-icon.png")}
                  style={styles.socialBtnImg}
                />
                <Text style={styles.socialBtnText}>Google</Text>
              </View>
            </Button>

            <Button
              variant="secondary"
              style={styles.btnExtended}
              onPress={() => {}}
            >
              <View style={styles.socialBtn}>
                <Image
                  source={require("@/assets/icons/apple-icon.png")}
                  style={styles.socialBtnImg}
                />
                <Text style={styles.socialBtnText}>Apple</Text>
              </View>
            </Button>
          </View>
        </View>

        <View style={styles.otherLinksContainer}>
          <Link href={"/"}>
            <Text style={styles.otherLinkText}>Privacy Policy</Text>
          </Link>
          <View style={styles.verticalDivider} />
          <Link href={"/"}>
            <Text style={styles.otherLinkText}>Terms of use</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF9F6",
  },
  header: {
    paddingTop: 16,
  },
  title: {
    fontFamily: "Recoleta",
    fontSize: 32,
    fontWeight: "500",
    color: Colors.light.grey11,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: Colors.light.grey5,
    fontFamily: "DMSans",
  },
  form: {
    marginTop: 40,
    gap: 20,
  },
  fpContainer: {
    alignItems: "flex-end",
  },
  fpText: {
    color: Colors.light.darkPurple,
    fontWeight: "600",
    textAlign: "right",
    fontFamily: "DMSans",
    fontSize: 14,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "DMSans",
  },
  signupContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  signupText: {
    textAlign: "center",
    fontFamily: "DMSans",
    fontSize: 16,
    fontWeight: "500",
  },
  signupSpan: {
    color: Colors.light.darkPurple,
    fontFamily: "DMSans",
    fontWeight: "600",
  },
  socialContainer: {
    marginTop: 24,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.grey3,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: Colors.light.grey6,
    fontFamily: "DMSans",
  },
  socialBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  btnExtended: {
    width: (width - 48) / 2,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  socialBtnImg: {
    width: 24,
    height: 24,
  },
  socialBtnText: {
    color: Colors.light.grey9,
    fontSize: 18,
    fontFamily: "DMSans",
    fontWeight: "500",
  },
  verticalDivider: {
    width: 1,
    height: 14,
    backgroundColor: Colors.light.grey3,
  },
  otherLinksContainer: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  otherLinkText: {
    color: Colors.light.grey6,
    fontSize: 14,
    fontFamily: "DMSans",
  },
});
