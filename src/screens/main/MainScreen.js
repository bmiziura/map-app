import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import LocationList from "../../components/LocationList";
import ScreenArea from "../../components/ScreenArea";
import Button from "../../components/ui/Button";
import { useUserData } from "../../context/UserDataContext";

import * as Location from "expo-location";
import { generatePoint } from "../../utils/point";

const Header = () => {
  const { userName } = useUserData();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SetupScreen")}
      style={styles.headerContainer}
    >
      <Text style={styles.headerText}>Witaj, {userName}!</Text>
    </TouchableOpacity>
  );
};

const Locations = () => {
  const { locations } = useUserData();

  return (
    <View>
      <LocationList title="Lokalizacje" locations={locations} />
    </View>
  );
};

const NewLocation = () => {
  const navigation = useNavigation();

  const { addLocation, maxDistance } = useUserData();

  const generateLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      ToastAndroid.showWithGravity(
        "Nie przyznano uprawnień",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }

    let location = await Location.getLastKnownPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000,
    });
    let distanceMax = maxDistance;
    let distanceMin = maxDistance * 0.7;
    let coords = location.coords;
    let point = generatePoint(
      coords.latitude,
      coords.longitude,
      Math.floor(Math.random() * (distanceMax - distanceMin)) + distanceMin,
    );

    const newLocation = await addLocation(point);

    navigation.navigate("MapStack", {
      screen: "MapScreen",
      params: {
        id: newLocation.id,
        currentPosition: coords,
        point,
      },
    });
  };

  return (
    <View style={styles.newLocationContainer}>
      <Button
        style={styles.newLocationButton}
        options={{
          onPress: generateLocation,
        }}
      >
        Wylosuj lokalizację
      </Button>
    </View>
  );
};

const MainScreen = () => {
  return (
    <ScreenArea>
      <View style={styles.headerWrapper}>
        <Header />
        <NewLocation />
      </View>
      <View style={styles.bottomContainer}>
        <Locations />
      </View>
    </ScreenArea>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  headerContainer: {
    paddingVertical: 10,
  },

  newLocationButton: {
    width: "100%",
    paddingVertical: 10,
  },

  headerText: {
    fontSize: 18,
  },

  bottomContainer: {
    flex: 6,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    padding: 20,
  },
});
