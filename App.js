import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/navigation/RootStack";

import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import UserDataContextProvider, {
  useUserData,
} from "./src/context/UserDataContext";
import SplashScreen from "./src/screens/splash/SplashScreen";

const AppLoader = () => {
  const { loadData, isLoaded } = useUserData();

  useEffect(() => {
    async function prepare() {
      await loadData();
    }

    prepare();
  }, []);

  return <>{!isLoaded ? <SplashScreen /> : <RootStack />}</>;
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <UserDataContextProvider>
          <AppLoader />
        </UserDataContextProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
