import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "../../screens/main/MainScreen";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import LikedLocationListScreen from "../../screens/locations/LikedLocationListScreen";
import SettingsScreen from "../../screens/settings/SettingsScreen";

const MainStackNavigator = createBottomTabNavigator();

const MainStack = () => {
  return (
    <MainStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStackNavigator.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarLabel: "Strona główna",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="home-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <MainStackNavigator.Screen
        name="LikedLocationListScreen"
        component={LikedLocationListScreen}
        options={{
          tabBarLabel: "Ulubione",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="cards-heart"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <MainStackNavigator.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Ustawienia",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="wrench" size={size} color={color} />
          ),
        }}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainStack;
