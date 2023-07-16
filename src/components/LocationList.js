import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LocationList = ({
  title = "Ostatnie lokalizacje",
  notFoundText = "Nie znaleziono żadnych lokalizacji.",
  locations = [],
}) => {
  locations = locations.sort((a, b) => {
    return new Date(a.createDate) - new Date(b.createDate);
  });

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.listTitle}>{title}</Text>
      </View>
      <View style={styles.scrollContainer}>
        {locations.length === 0 ? (
          <Text style={styles.notFoundText}>{notFoundText}</Text>
        ) : (
          <FlatList
            data={locations}
            renderItem={({ item }) => <LocationItem location={item} />}
          />
        )}
      </View>
    </View>
  );
};

const LocationItem = ({ location }) => {
  const navigation = useNavigation();

  const openModal = () => {
    navigation.navigate("LocationModal", {
      id: location.id,
    });
  };

  return (
    <TouchableOpacity style={styles.locationItemContainer} onPress={openModal}>
      <Text>
        {new Intl.DateTimeFormat("en-EN", {
          dateStyle: "full",
        }).format(new Date(location.createDate))}
      </Text>
      <Text>{location.completed ? "Ukończona" : "Nieukończona"}</Text>
      <View>
        <Entypo
          name="dots-three-vertical"
          size={13}
          color="rgba(0, 0, 0, 0.5)"
        />
      </View>
    </TouchableOpacity>
  );
};

export default LocationList;

const styles = StyleSheet.create({
  titleContainer: {},

  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  scrollContainer: {
    borderTopColor: "rgba(0, 0, 0, 0.05)",
    borderTopWidth: 1,

    marginVertical: 5,

    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    borderBottomWidth: 1,
  },

  notFoundText: {
    paddingVertical: 5,
  },

  locationItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 5,
    marginVertical: 1,
  },
});
