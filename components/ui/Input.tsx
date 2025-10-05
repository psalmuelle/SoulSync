import { Colors } from "@/constants/Color";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  errorMsg?: string;
}

export default function InputField({ label, errorMsg, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          {...rest}
          style={styles.input}
          placeholderTextColor={Colors.light.grey2}
        />
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
  error: {
    color: "#E04A7D",
    fontSize: 14,
    fontFamily: "DMSans",
  },
});
