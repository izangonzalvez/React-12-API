import React, { useState } from 'react';
import PlaceList from './PlaceList';

export default function PlacesList() {
  const [places, setPlaces] = useState(JSON.parse(localStorage.getItem('places')) || []);
  const userInfo = JSON.parse(localStorage.getItem('authToken'));
  const { name: userName, email: userEmail } = userInfo;

  const deletePlace = (id) => {
    const filteredPlaces = places.filter((place) => place.id !== id);
    setPlaces(filteredPlaces);
    localStorage.setItem('places', JSON.stringify(filteredPlaces));
  };

  return (
    places.map((element) => (
      <>
        {element.visibility == 1 || element.userEmail == userEmail ? (
          <PlaceList key={element.id} element={element} deletePlace={deletePlace} />
        ) : (
          <></>
        )}
      </>
    ))
  );
}
