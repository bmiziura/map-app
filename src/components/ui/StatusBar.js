import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenArea from "../ScreenArea";

const StatusBar = ({ title, children }) => {
  const navigation = useNavigation();

  return (
    <ScreenArea style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
            <Text
              style={{
                fontSize: 12,
              }}
            >
              {title}
            </Text>
          </TouchableOpacity>
          <View style={styles.optionsContainer}>{children}</View>
        </View>
      </View>
    </ScreenArea>
  );
};

export default StatusBar;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 0,
    backgroundColor: "white",
  },

  container: {
    paddingHorizontal: 10,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 10,
  },

  titleContainer: {
    flexDirection: "row",

    alignItems: "center",
  },

  optionsContainer: {
    flexDirection: "row",

    alignItems: "center",
  },
});
