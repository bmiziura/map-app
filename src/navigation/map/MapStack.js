import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "../../screens/map/MapScreen";

const MapStackNavigator = createNativeStackNavigator();

const MapStack = () => {
  return (
    <MapStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MapStackNavigator.Screen name="MapScreen" component={MapScreen} />
    </MapStackNavigator.Navigator>
  );
};

export default MapStack;
