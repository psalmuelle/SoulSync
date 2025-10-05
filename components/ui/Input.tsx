import { Colors } from "@/constants/Color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  errorMsg?: string;
  ref?: React.Ref<TextInput>;
}

export default function InputField({
  label,
  errorMsg,
  ref,
  ...rest
}: InputProps) {
  const isPasswordField =
    rest.textContentType === "password" ||
    rest.textContentType === "newPassword";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          {...rest}
          ref={ref}
          style={[styles.input, isPasswordField && styles.inputWithPadding]}
          placeholderTextColor={Colors.light.grey2}
          secureTextEntry={
            isPasswordField ? !showPassword : rest.secureTextEntry
          }
        />
        {isPasswordField && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.passwordIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color={Colors.light.grey3}
            />
          </Pressable>
        )}
      </View>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  inputContainer: {
    gap: 8,
    position: "relative",
  },
  label: {
    fontSize: 18,
    fontFamily: "DMSans",
    color: Colors.light.grey6,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.grey3,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: "DMSans",
    color: Colors.light.grey9,
  },
  inputWithPadding: {
    paddingRight: 44,
  },
  error: {
    color: "#E04A7D",
    fontSize: 14,
    fontFamily: "DMSans",
  },
  passwordIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    padding: 4,
    borderRadius: 100,
  },
});
