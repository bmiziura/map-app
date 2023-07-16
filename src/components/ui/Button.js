import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ children, options, style, styleText }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} {...options}>
      <Text style={[styles.buttonText, styleText]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "white",
    borderRadius: 100,
    paddingHorizontal: 5,
    paddingVertical: 5,

    borderColor: "rgba(0, 0, 0, 0.01)",
    borderWidth: 1,

    alignItems: "center",
  },

  buttonText: {
    fontSize: 12,
  },
});
