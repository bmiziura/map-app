import React from "react";
import { StyleSheet, View } from "react-native";
import LocationList from "../../components/LocationList";
import StatusBar from "../../components/ui/StatusBar";
import { useUserData } from "../../context/UserDataContext";

const LikedLocationListScreen = () => {
  const { locations } = useUserData();

  const sortedLocations = locations.filter((loc) => loc.liked);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar title="Ulubione lokalizacje" />

      <View style={styles.container}>
        <LocationList
          title="Ulubione lokalizacje"
          notFoundText="Nie polubiłeś żadnych lokalizacji"
          locations={sortedLocations}
        />
      </View>
    </View>
  );
};

export default LikedLocationListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

    marginTop: 15,

    padding: 10,
    paddingHorizontal: 20,
  },
});
