import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import React, { useState } from "react";
import { LocationData } from '../../Types/Coordinates';
import { DirectionsRendererType, DirectionsServiceType, LatLngLiteral, MapType } from '../../Types/Map';
import {
  useInitializeMap,
  useInitializeMarkers,
  useInitializeDirectionsServiceAndRenderer,
  useUpdateDirections,
} from './utils/mapUtils';
import Loader from '../../components/Loader/Loader';

export default function Home({ coordinates }: LocationData) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  });
  const [map, setMap] = useState<MapType>(null!);
  const [markers, setMarkers] = useState<LatLngLiteral[]>([]);
  const [directionsService, setDirectionsService] = useState<DirectionsServiceType>(null!);
  const [directionsRenderer, setDirectionsRenderer] = useState<DirectionsRendererType>(null!);

  useInitializeMap(map, coordinates);
  useInitializeMarkers(isLoaded, coordinates, setMarkers);
  useInitializeDirectionsServiceAndRenderer(isLoaded, setDirectionsService, setDirectionsRenderer);
  useUpdateDirections(directionsService, directionsRenderer, markers, map);

  const initialPosition = coordinates.length > 0
    ? { lat: coordinates[0].latitude, lng: coordinates[0].longitude }
    : { lat: 0, lng: 0 };

  if (!isLoaded) return <Loader />;
  return (
    <GoogleMap zoom={10} center={initialPosition} onLoad={map => setMap(map)}>
      {markers.map((markerPosition, index) => (
        <Marker key={index} position={markerPosition} />
      ))}
    </GoogleMap>
  );
}