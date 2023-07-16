import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import Input from "../../components/ui/Input";
import StatusBar from "../../components/ui/StatusBar";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUserData } from "../../context/UserDataContext";

const SettingsScreen = () => {
  const [changed, setChanged] = useState(false);

  const { maxDistance: distance, changeMaxDistance } = useUserData();

  const [maxDistance, setMaxDistance] = useState(`${distance}`);

  useEffect(() => {
    if (maxDistance != distance) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [maxDistance]);

  const saveHandler = async () => {
    let d = parseInt(maxDistance);

    if (d < 50 || d > 10000) {
      ToastAndroid.showWithGravity(
        "Odległość punktu musi być w przedziale od 50m do 10000m!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }

    await changeMaxDistance(maxDistance);

    ToastAndroid.showWithGravity(
      "Zapisano ustawienia",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );

    setChanged(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar title="Ustawienia">
        {changed && (
          <TouchableOpacity onPress={saveHandler}>
            <MaterialCommunityIcons
              name="content-save-edit"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
      </StatusBar>

      <View style={styles.container}>
        <Setting title="Dystans od losowanego punktu (metry)">
          <Input
            text={maxDistance}
            onChange={(text) => {
              setMaxDistance(text.replace(/[^0-9]/g, ""));
            }}
            inputOptions={{
              keyboardType: "numeric",
            }}
          />
        </Setting>
      </View>
    </View>
  );
};

const Setting = ({ title, children }) => {
  return (
    <View style={styles.setting}>
      <Text style={styles.settingText}>{title}</Text>
      <View>{children}</View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

    marginTop: 15,

    padding: 10,
    paddingHorizontal: 20,
  },

  setting: {},

  settingText: {
    marginBottom: 10,
  },
});
