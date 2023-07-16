import { useEffect, useState } from "react";

function useDirections({ clientPosition, pointPosition }) {
  const [directions, setDirections] = useState();
  const [updatingPosition, setUpdatingPosition] = useState(false);

  useEffect(() => {
    const updateLocation = async () => {
      if (updatingPosition) return;

      setUpdatingPosition(true);

      const clientLoc = `${clientPosition.longitude}%2C${clientPosition.latitude}`;
      const pointLoc = `${pointPosition.longitude}%2C${pointPosition.latitude}`;
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${clientLoc}%3B${pointLoc}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiZ29ibGljcGwiLCJhIjoiY2xoajF4NDZxMGRteTNzcGhncW1wYzh4ciJ9.LCHpkM-104hi_u-LPPbODw`,
      );
      const data = await response.json();
      const route = data.routes[0];

      const coordinates = [];

      route.geometry.coordinates.map((coords) => {
        coordinates.push({
          longitude: coords[0],
          latitude: coords[1],
        });
      });

      let currentName = data.waypoints[0].name
        ? data.waypoints[0].name
        : directions?.waypoints.current.name;
      let pointName = data.waypoints[1].name
        ? data.waypoints[1].name
        : directions?.waypoints.point.name;

      const finalData = {
        distance: route.distance,
        duration: route.duration,
        waypoints: {
          current: {
            name: currentName,
          },
          point: {
            name: pointName,
          },
        },
        route: {
          coordinates,
        },
      };

      setDirections(finalData);

      setUpdatingPosition(false);
    };

    updateLocation();
  }, [clientPosition]);

  return {
    directions,
  };
}

export default useDirections;
