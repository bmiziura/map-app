import { useEffect, useState } from "react";

import * as Location from "expo-location";

function useClientLocation({ currentPosition, updateTime = 5000 }) {
  const [position, setPosition] = useState(currentPosition);
  const [updatingPosition, setUpdatingPosition] = useState(false);

  useEffect(() => {
    const updateTimer = setInterval(async () => {
      if (updatingPosition) return;

      try {
        setUpdatingPosition(true);

        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          ToastAndroid.showWithGravity(
            "Brak uprawnień",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          maximumAge: 10000,
        });
        let coords = location.coords;

        setPosition(coords);
      } catch (err) {
      } finally {
        setUpdatingPosition(false);
      }
    }, updateTime);

    return () => {
      clearInterval(updateTimer);
    };
  }, []);

  return {
    position,
  };
}

export default useClientLocation;
