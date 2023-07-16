import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const Input = ({ text, onChange, inputOptions }) => {
  return (
    <View style={styles.container}>
      <TextInput
        returnKeyType="go"
        value={text}
        onChangeText={onChange}
        {...inputOptions}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 50,

    paddingHorizontal: 5,

    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
  },
});
