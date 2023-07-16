import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUserData } from "../context/UserDataContext";
import ModalLocationScreen from "../screens/locations/ModalLocationScreen";
import SetupScreen from "../screens/setup/SetupScreen";
import MainStack from "./main/MainStack";
import MapStack from "./map/MapStack";

const RootStackNavigator = createNativeStackNavigator();

const RootStack = () => {
  const { userName } = useUserData();

  return (
    <RootStackNavigator.Navigator
      initialRouteName={!userName ? "SetupScreen" : "MainStack"}
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <RootStackNavigator.Group>
        <RootStackNavigator.Screen name="MainStack" component={MainStack} />
        <RootStackNavigator.Screen
          name="MapStack"
          component={MapStack}
          options={{
            animation: "fade",
          }}
        />
        <RootStackNavigator.Screen
          name="SetupScreen"
          component={SetupScreen}
          options={{
            animation: "fade_from_bottom",
          }}
        />
      </RootStackNavigator.Group>

      <RootStackNavigator.Group screenOptions={{ presentation: "modal" }}>
        <RootStackNavigator.Screen
          name="LocationModal"
          component={ModalLocationScreen}
          options={{
            animation: "fade_from_bottom",
          }}
        />
      </RootStackNavigator.Group>
    </RootStackNavigator.Navigator>
  );
};

export default RootStack;
