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
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const { width } = Dimensions.get("window");

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const pagerRef = useRef<PagerView>(null);

  // Create refs for input fields
  const fullNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = async (data: any) => {
    setIsLoading(true);

    // Simulate registration API call
    setTimeout(() => {
      // For demo purposes, accept any valid input
      storage.set("isAuthenticated", true);
      storage.set("userEmail", data.email);
      storage.set("userName", data.fullName);
      setIsLoading(false);
      router.replace("/(tabs)");
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Create Your Safe Space</Text>
          <Text style={styles.description}>
            We're glad you're here. Let's get you set up gently.
          </Text>
        </View>
        <PagerView
          ref={pagerRef}
          scrollEnabled={false}
          style={styles.pagerView}
          initialPage={0}
        >
          <View key={"1"}>
            <Image
              source={require("@/assets/images/register-illustration.png")}
              style={styles.illustration}
              contentFit="contain"
            />

            <Button onPress={() => pagerRef.current?.setPage(1)}>
              <Text style={styles.btnText}>Continue with Email</Text>
            </Button>
          </View>
          <View key={"2"}>
            <View style={styles.form}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    ref={fullNameRef}
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    textContentType="name"
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current?.focus()}
                  />
                )}
                name="fullName"
              />

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
                    textContentType="newPassword"
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit(handleRegister)}
                  />
                )}
                name="password"
              />

              <Button onPress={handleSubmit(handleRegister)}>
                <Text style={styles.btnText}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Text>
              </Button>
            </View>
          </View>
        </PagerView>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Already have an account?{" "}
            <Link href="/sign-in" style={styles.signupSpan}>
              Sign In
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
  pagerView: {
    minHeight: 384,
  },
  illustration: {
    width: 0.8 * width,
    height: 320,
    marginHorizontal: "auto",
    marginTop: 4,
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
  btnText: {
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
