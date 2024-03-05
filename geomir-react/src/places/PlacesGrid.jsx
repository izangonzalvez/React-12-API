import PlaceGrid from "./PlaceGrid";
import { useState } from "react";
import { Container } from "react-bootstrap";

export default function PlacesGrid() {
  const userInfo = JSON.parse(localStorage.getItem("authToken"));
  const { name: userName, email: userEmail } = userInfo;
  let [places, setPlaces] = useState(JSON.parse(localStorage.getItem("places")) || []);

  const deletePlace = (id) => {
    const filteredPlaces = places.filter((place) => place.id !== id);
    setPlaces(filteredPlaces);
    localStorage.setItem("places", JSON.stringify(filteredPlaces));
  };

  return (
    <Container className="izan-content">
      {places.map((element, index) => {
        return (
          <>
            {element.visibility == 1 || element.userEmail == userEmail ? (
              <PlaceGrid key={element.id} element={element} deletePlace={deletePlace} />
            ) : (
              <></>
            )}
          </>
        );
      })}
    </Container>
  );
}
