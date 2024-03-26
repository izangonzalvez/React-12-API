import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import mapPhoto from "./img/map.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapGL, { Marker as MapGLMarker } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPerson } from '@fortawesome/free-solid-svg-icons';
import key from 'keymaster';

export default function MapAdria() {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [mapViewport, setMapViewport] = useState({
    latitude: 41.231091,
    longitude: 1.728150,
    zoom: 18,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        }
      );
    } else {
      console.error("Geolocalización no soportada en este navegador");
    }

    key('ctrl+alt+G', function (event, handler) {
      alert(`Coordenadas actuales: \nLatitud: ${userLocation.latitude}\nLongitud: ${userLocation.longitude}`);
    });

    key('ctrl+alt+C', function (event, handler) {
      setMapViewport({
        latitude: 41.231091,
        longitude: 1.728150,
        zoom: 19,
      });
    });

    return () => {
      key.unbind('ctrl+alt+G');
      key.unbind('ctrl+alt+C');
    };
  }, [userLocation]);

  return (
    <MapGL
      mapboxAccessToken="pk.eyJ1IjoiaXphYW5nYSIsImEiOiJjbHJqaXE4dGgwM2t5MmtwNTg2NGphNjlwIn0.6mHgzSZhXgOnt8-P8yDXPQ"
      latitude={mapViewport.latitude}
      longitude={mapViewport.longitude}
      zoom={mapViewport.zoom}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{ width: "100%", height: "60vh" }}
      onViewportChange={(viewport) => setMapViewport(viewport)}
    >
      <MapGLMarker
        latitude={41.231091}
        longitude={1.728150}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <div style={{ color: 'red', fontSize: '18px' }}><FontAwesomeIcon icon={faLocationDot} /></div>
      </MapGLMarker>

      <MapGLMarker
        latitude={userLocation.latitude}
        longitude={userLocation.longitude}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <div style={{ color: 'blue', fontSize: '18px' }}><FontAwesomeIcon icon={faPerson} /></div>
      </MapGLMarker>
    </MapGL>
  );
}
