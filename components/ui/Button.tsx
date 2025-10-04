import { Colors } from "@/constants/Color";
import { Pressable, StyleSheet } from "react-native";

export default function Button({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.btn, style]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.light.grey10,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 16,
  },
});
