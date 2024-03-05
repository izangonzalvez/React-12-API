import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useEffect, useState } from 'react';
import Mousetrap from "mousetrap";

export default function Map () {
  const Position = [41.231091, 1.728150];
  const [userPosition, setUserPosition] = useState([0, 0]);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    const showPosition = (pos) => {
      const { latitude, longitude } = pos.coords;
      setUserPosition([latitude, longitude]);
    };

    getLocation();
  }, []);

  const MostarCord = () => {
    if (userPosition) {
      const popupContent = `Latitud: ${userPosition[0]}<br/>Longitud: ${userPosition[1]}`;
      L.popup().setLatLng(userPosition).setContent(popupContent).openOn(mapRef.current);
    }
  };

  const centerOnInstitut = () => {
    mapRef.current.setView(Position, 18);
  };

  const CentrarInstituto = 'ctrl+alt+c';
  Mousetrap.bind(CentrarInstituto, centerOnInstitut);

  const VerMisCordenadas = 'ctrl+alt+g';
  Mousetrap.bind(VerMisCordenadas, MostarCord);

  const mapRef = React.createRef();

  return (
    <>
      <MapContainer center={Position} zoom={18} style={{ height: "60vh", width: "100%" }} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={Position}>
          <Popup>
            Coordenadas Institut Joaquim Mir: {Position[0]}, {Position[1]}
          </Popup>
        </Marker>

        <Marker position={userPosition}>
          <Popup>
            Estas aquí: {userPosition[0]}, {userPosition[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};
