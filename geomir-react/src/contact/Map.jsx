  import React, { useEffect, useState } from 'react';
  import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
  import Mousetrap from 'mousetrap';
  import { Button } from 'react-bootstrap';

  export default function Map() {
    const Position = [41.231091, 1.728150];
    const [userPosition, setUserPosition] = useState([0, 0]);
    const [keyboardShortcutsEnabled, setKeyboardShortcutsEnabled] = useState(true);

    useEffect(() => {
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };

      const showPosition = (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPosition([latitude, longitude]);
      };

      getLocation();
    }, []);

    useEffect(() => {
      const centerOnInstitut = () => {
        if (keyboardShortcutsEnabled) {
          mapRef.current.setView(Position, 18);
        }
      };

      const mostarCord = () => {
        if (keyboardShortcutsEnabled && userPosition) {
          const popupContent = `Latitud: ${userPosition[0]}<br/>Longitud: ${userPosition[1]}`;
          L.popup().setLatLng(userPosition).setContent(popupContent).openOn(mapRef.current);
        }
      };

      Mousetrap.bind('ctrl+alt+c', centerOnInstitut);
      Mousetrap.bind('ctrl+alt+g', mostarCord);

      return () => {
        Mousetrap.unbind('ctrl+alt+c');
        Mousetrap.unbind('ctrl+alt+g');
      };
    }, [keyboardShortcutsEnabled, userPosition]);

    const mapRef = React.createRef();

    const toggleKeyboardShortcuts = () => {
      setKeyboardShortcutsEnabled((prev) => !prev);
    };

    return (
      <>
        <div>
          <Button onClick={toggleKeyboardShortcuts}>
            {keyboardShortcutsEnabled ? 'Desactivar atajos de teclado' : 'Activar atajos de teclado'}
          </Button>
        </div>
        <MapContainer center={Position} zoom={18} style={{ height: '60vh', width: '100%' }} ref={mapRef}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={Position}>
            <Popup>Coordenadas Institut Joaquim Mir: {Position[0]}, {Position[1]}</Popup>
          </Marker>

          <Marker position={userPosition}>
            <Popup>Estas aquí: {userPosition[0]}, {userPosition[1]}</Popup>
          </Marker>
        </MapContainer>
      </>
    );
  }
