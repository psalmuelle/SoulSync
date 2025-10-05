import { Colors } from "@/constants/Color";
import { Pressable, StyleSheet } from "react-native";

export default function Button({
  children,
  onPress,
  style,
  variant = "primary",
}: {
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
  variant?: "primary" | "secondary";
}) {
  return (
    <Pressable onPress={onPress} style={[styles[`btn-${variant}`], style]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  "btn-primary": {
    backgroundColor: Colors.light.grey10,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 16,
  },
  "btn-secondary": {
    backgroundColor: Colors.light.white5,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 16,
  },
});
