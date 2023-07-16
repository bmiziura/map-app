import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../map/MapScreen";

import BottomSheet from "@gorhom/bottom-sheet";
import Button from "../../components/ui/Button";
import { useUserData } from "../../context/UserDataContext";

import * as Location from "expo-location";
import StatusBar from "../../components/ui/StatusBar";

const ModalLocationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { removeLocation, getLocation, updateLocation } = useUserData();
  const { id } = route.params;

  const location = getLocation(id);

  if (!location) {
    navigation.navigate("MainStack", {
      screen: "MainScreen",
    });
    return;
  }

  const region = {
    latitude: location.latitude,
    longitude: location.longitude,

    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const snapPoints = useMemo(() => ["10%", "25%", "35%", "50%", "85%"], []);

  const deleteHandler = async () => {
    await removeLocation(location);

    ToastAndroid.showWithGravity(
      "Pomyślnie usunięto lokalizację",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );

    navigation.navigate("MainStack", {
      screen: "MainScreen",
    });
  };

  const likeHandler = async () => {
    location.liked = !location.liked;

    await updateLocation(location);
  };

  const startTravel = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      ToastAndroid.showWithGravity(
        "Nie przyznano uprawnień",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }

    let loc = await Location.getLastKnownPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000,
    });
    let coords = loc.coords;

    navigation.navigate("MapStack", {
      screen: "MapScreen",
      params: {
        id,
        currentPosition: coords,
        point: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar title="Szczegóły lokalizacji">
        <TouchableOpacity
          onPress={likeHandler}
          style={{
            marginRight: 15,
          }}
        >
          <Ionicons
            name={location.liked ? "heart" : "heart-outline"}
            size={24}
            color={location.liked ? "red" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteHandler}>
          <Ionicons name="trash-bin-outline" size={24} color="black" />
        </TouchableOpacity>
      </StatusBar>
      <View
        style={{
          flex: 1,
        }}
      >
        <MapView
          style={styles.map}
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          showsPointsOfInterest={false}
          showsCompass={false}
        >
          <Marker title="marker" description="marker" coordinate={region} />
        </MapView>
        <BottomSheet index={2} snapPoints={snapPoints}>
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            <View style={styles.bottomSheetHeaderContainer}>
              <Text style={styles.bottomSheetHeaderText}>
                Szczegóły lokalizacji
              </Text>
            </View>
            <View style={styles.bottomSheetLocationRow}>
              <View style={styles.bottomSheetLocationColumn}>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Lat:
                </Text>
                <Text>{location.latitude}</Text>
              </View>
              <View style={styles.bottomSheetLocationColumn}>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Long:
                </Text>
                <Text>{location.longitude}</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomSheetLocationRow}>
            <View style={styles.bottomSheetLocationColumn}>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Status:
              </Text>
              <Text>{location.completed ? "ukończona" : "nieukończona"}</Text>
            </View>
          </View>
          <View style={styles.bottomSheetLocationRow}>
            <Button
              style={{
                flex: 1,
                marginHorizontal: 10,
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              }}
              options={{
                onPress: startTravel,
              }}
            >
              {location.completed ? "Powtórz podróż" : "Rozpocznij podróż"}
            </Button>
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};

export default ModalLocationScreen;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },

  bottomSheetHeaderContainer: {
    alignItems: "center",

    marginVertical: 10,
  },

  bottomSheetHeaderText: {
    fontSize: 15,
    fontWeight: "bold",
  },

  bottomSheetLocationRow: {
    flexDirection: "row",
    justifyContent: "space-around",

    paddingBottom: 15,
  },

  bottomSheetLocationColumn: {
    alignItems: "center",
  },
});
