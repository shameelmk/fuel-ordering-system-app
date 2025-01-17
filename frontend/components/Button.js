import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Button({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button(9)} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: (marginRight) => ({
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#333",
    marginHorizontal: marginRight ? marginRight : 0,
    height: 50,
  }),
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textTransform: "uppercase",
  },
});
