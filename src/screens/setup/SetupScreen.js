import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useUserData } from "../../context/UserDataContext";

const SetupScreen = ({ navigation }) => {
  const [error, setError] = useState(false);

  const { userName, setUserName, changeUserName } = useUserData();

  const [tempName, setTempName] = useState(userName);

  const handleEnding = async () => {
    if (!tempName) {
      setError("Nie podano imienia");
      return;
    }

    await changeUserName(tempName);

    navigation.replace("MainStack", {
      screen: "MainScreen",
    });
  };

  useEffect(() => {
    if (error) {
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Witaj w aplikacji!</Text>
          <Text style={styles.headerDescription}>
            Podaj poniżej swoje imię, aby rozpocząć korzystanie z aplikacji
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            text={tempName}
            onChange={(text) => {
              setTempName(text);
            }}
            inputOptions={{
              placeholder: "Twoje imię",
              onEndEditing: handleEnding,
            }}
          />
          <Button
            style={styles.button}
            options={{
              onPress: handleEnding,
            }}
          >
            {!userName ? "Rozpocznij" : "Zmień nazwę"}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  panel: {},

  header: {
    marginBottom: 10,
  },

  headerText: {
    fontSize: 20,
  },

  headerDescription: {
    fontSize: 10,
  },

  form: {},

  button: {
    marginTop: 10,
  },
});
