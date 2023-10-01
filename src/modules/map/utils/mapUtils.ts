import { useEffect } from 'react';
import {
  LatLngLiteral,
  MapType,
  DirectionsServiceType,
  DirectionsRendererType,
} from '../../../Types/Map';
import { Coordinates } from '../../../Types/Coordinates';

export function useInitializeMap(map: MapType, coordinates: Coordinates[]) {
  useEffect(() => {
    if (map) {
      if (coordinates.length > 0) {
        const firstCoordinate = coordinates[0];
        map.panTo({ lat: firstCoordinate.latitude, lng: firstCoordinate.longitude });
      }
    }
  }, [map, coordinates]);
}

export function useInitializeMarkers(isLoaded: boolean, coordinates: Coordinates[], setMarkers: Function) {
  useEffect(() => {
    if (isLoaded) {
      const markerCoordinates = coordinates.map((coord, index) => ({
        id: index,
        position: { lat: coord.latitude, lng: coord.longitude },
      }));
      setMarkers(markerCoordinates.map(({ position: { lat, lng } }) => ({ lat, lng })));
    }
  }, [isLoaded, coordinates, setMarkers]);
}

export function useInitializeDirectionsServiceAndRenderer(isLoaded: boolean, setDirectionsService: Function, setDirectionsRenderer: Function) {
  useEffect(() => {
    if (isLoaded) {
      const directionsServiceInstance = new google.maps.DirectionsService();
      const directionsRendererInstance = new google.maps.DirectionsRenderer();
      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);
    }
  }, [isLoaded, setDirectionsService, setDirectionsRenderer]);
}

export function useUpdateDirections(directionsService: DirectionsServiceType, directionsRenderer: DirectionsRendererType, markers: LatLngLiteral[], map: MapType) {
  useEffect(() => {
    if (directionsService && directionsRenderer && markers.length > 1) {
      const waypoints = markers.slice(1, -1).map(marker => ({ location: marker }));
      directionsService.route(
        {
          origin: markers[0],
          destination: markers[markers.length - 1],
          waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            if (map) {
              directionsRenderer.setMap(map);
            }
          } else {
            console.error(`Directions request failed: ${status}`);
          }
        }
      );
    }
  }, [directionsService, directionsRenderer, markers, map]);
}