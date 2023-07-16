import { AntDesign } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo } from "react";
import { Dimensions, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { useUserData } from "../../context/UserDataContext";
import useClientLocation from "../../hooks/useClientLocation";
import useDirections from "../../hooks/useDirections";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
export const LATITUDE_DELTA = 0.02;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = ({ route }) => {
  const { id, currentPosition, point } = route.params;

  const { updateLocation, getLocation } = useUserData();

  const { position } = useClientLocation({ currentPosition });

  const { directions } = useDirections({
    clientPosition: position,
    pointPosition: point,
  });

  const navigation = useNavigation();

  const region = {
    latitude: position.latitude,
    longitude: position.longitude,

    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const pointRegion = {
    latitude: point.latitude,
    longitude: point.longitude,

    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  useEffect(() => {
    if (!directions?.distance) return;

    let distance = directions?.distance;
    if (distance <= 20) {
      const updateLoc = async () => {
        let loc = await getLocation(id);
        loc.completed = true;

        await updateLocation(loc);

        ToastAndroid.showWithGravity(
          "Dotarłeś do punktu",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );

        navigation.goBack();
      };

      updateLoc();
    }
  }, [directions]);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsUserLocation={true}
        followsUserLocation={true}
        showsIndoors={false}
      >
        <Marker title="marker" description="marker" coordinate={pointRegion} />
        {directions && (
          <>
            <Polyline
              coordinates={directions.route.coordinates}
              strokeColor="#a3b3ee" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={["#a3b3ee"]}
              strokeWidth={5}
            />
          </>
        )}
      </MapView>
      <View
        style={{
          position: "absolute",
          paddingTop: 30,
          paddingLeft: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <BottomSheet index={0} snapPoints={snapPoints}>
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <View style={styles.bottomSheetLocationRow}>
            <View style={styles.bottomSheetLocationColumn}>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Pozostała odległość
              </Text>
              <Text>{directions?.distance}m</Text>
            </View>
          </View>
          <View style={styles.bottomSheetLocationRow}>
            <View style={styles.bottomSheetLocationColumn}>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Aktualna lokalizacja
              </Text>
              <Text>
                {directions?.waypoints?.current?.name || "Wczytywanie..."}
              </Text>
            </View>
            <View style={styles.bottomSheetLocationColumn}>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Lokalizacja punktu
              </Text>
              <Text>
                {directions?.waypoints?.point?.name || "Wczytywanie..."}
              </Text>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },

  userMarkerView: {
    alignItems: "center",
    justifyContent: "center",
  },

  endLocationButton: {
    backgroundColor: "gray",
    paddingVertical: 20,
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

  shadow: {
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});
