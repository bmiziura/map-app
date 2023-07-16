import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState } from "react";

const UserDataContext = createContext({});

export function useUserData() {
  return useContext(UserDataContext);
}

const UserDataContextProvider = ({ children }) => {
  const [isLoaded, setLoaded] = useState(false);

  const [userName, setUserName] = useState();
  const [locations, setLocations] = useState([]);
  const [maxDistance, setMaxDistance] = useState(150);

  const changeUserName = async (name) => {
    await AsyncStorage.setItem("@userName", name);

    setUserName(name);
  };

  const changeMaxDistance = async (distance) => {
    await AsyncStorage.setItem("@maxDistance", `${distance}`);

    setMaxDistance(distance);
  };

  const addLocation = async (loc) => {
    const createDate = new Date();
    const newLocation = {
      id: `${loc.latitude}-${loc.longitude}-${new Intl.DateTimeFormat(
        "pl-PL",
      ).format(createDate)}`,
      createDate,
      latitude: loc.latitude,
      longitude: loc.longitude,
      completed: false,
      liked: false,
    };

    const newLocations = [...locations, newLocation];

    await AsyncStorage.setItem("@locations", JSON.stringify(newLocations));

    setLocations(newLocations);

    return newLocation;
  };

  const getLocation = (id) => {
    return locations.find((loc) => loc.id === id);
  };

  const updateLocation = async (loc) => {
    const newLocations = [...locations].filter(
      (location) => location.id !== loc.id,
    );

    newLocations.push(loc);

    await AsyncStorage.setItem("@locations", JSON.stringify(newLocations));

    setLocations(newLocations);
  };

  const removeLocation = async (loc) => {
    const newLocations = [...locations].filter(
      (location) => location.id !== loc.id,
    );

    await AsyncStorage.setItem("@locations", JSON.stringify(newLocations));

    setLocations(newLocations);
  };

  const loadData = async () => {
    const userName = await AsyncStorage.getItem("@userName");

    if (userName !== null) {
      setUserName(userName);
    }

    const locations = await AsyncStorage.getItem("@locations");

    if (locations !== null) {
      setLocations(JSON.parse(locations));
    }

    const maxDistance = await AsyncStorage.getItem("@maxDistance");

    if (maxDistance !== null) {
      setMaxDistance(parseInt(maxDistance));
    }

    setLoaded(true);
  };

  const data = {
    userName,
    changeUserName,
    setUserName,
    loadData,
    isLoaded,
    locations,
    addLocation,
    removeLocation,
    updateLocation,
    getLocation,
    maxDistance,
    changeMaxDistance,
  };

  return (
    <UserDataContext.Provider value={data}>{children}</UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
