import { useParams, useNavigate } from "react-router-dom"
import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';
import ReviewsList from "./reviews/ReviewsList";
import { UserContext } from "../userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash,faEye, faStar } from '@fortawesome/free-solid-svg-icons';

export default function Place() {
  let places = JSON.parse(localStorage.getItem('places')) || [];
  const { id } = useParams();
  const { authToken } = useContext(UserContext);
  let placeEspecifico = places.find(element => element.id === id);
  let [place, setPlace] = useState(placeEspecifico);
  let userInfo = JSON.parse(localStorage.getItem("authToken"));
  const navigate = useNavigate();
  let favoriteList = JSON.parse(localStorage.getItem("favorites")) || [];
  let favorite = [];
  let [favorites, setFavorites] = useState(0);
  const [favorited, setFavorited] = useState(false)

  useEffect( ()=>
    {
        favorite = favoriteList.filter(objecte => objecte.id == id)
        setFavorites(favorite.length)
        {favoriteList.map( (element )=> { 

            if (authToken.email == element.author && element.id == id){
                setFavorited(true)
                
            }
        })}
    },[favorited])

  const handleDelete = () => {
    const filteredPlaces = places.filter(element => element.id !== id);
    setPlace(null);
    localStorage.setItem('places', JSON.stringify(filteredPlaces));
    navigate('/places/list');
  };

  const handleFavoritePlace = (e, author ,id) => {
    e.preventDefault();
    favoriteList.push({id, author});
    localStorage.setItem("favorites", JSON.stringify(favoriteList));
    setFavorited(true)  
  }

  const handleDeleteFavorite = (e, author, id) => {
    e.preventDefault();


    favoriteList = favoriteList.filter(element => !(element.author === authToken.email && element.id === id));
    
    localStorage.setItem("favorites", JSON.stringify(favoriteList));

    setFavorited(false)

  };

  return (
    <>
    <Card className="izan-contents">
      <Card.Body>
        <Card.Title>{place ? place.name || '-' : 'Lugar no encontrado'}</Card.Title>
        <Container>
          <Row>
            <Col>
              {place && place.upload ? (
                <Card.Img variant="top" className="imgver" src={place.upload} alt={`Imagen de ${place.name}`} />
              ) : (
                '-'
              )}
              <Card.Text>
                {place ? place.description || '-' : 'Lugar no encontrado'}
              </Card.Text>
              {place && (
                <>
                  <div className="lat-long">Latitud: {place.latitude || '-'}</div>
                  <div className="lat-long">Longitud: {place.longitude || '-'}</div>
                  <div className="button-container mt-3">
                    {place.author.userEmail === userInfo.email ? (
                      <>
                        <Button variant="primary" onClick={() => navigate(`/places/edit/${place.id}`)}><FontAwesomeIcon icon={faPen} /></Button>{' '}
                        <Button variant="danger" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></Button>
                      </>
                    ) : (
                      <p>sin función</p>
                    )}
                    { favorited ?  
                          <div><Button variant="outline-secondary" 
                              onClick={(e) => {
                                  handleDeleteFavorite(e, authToken.email, id);
                                  
                              }}
                          ><FontAwesomeIcon icon={faStar} />- {favorites}</Button></div> 
                          : <Button variant="outline-secondary"
                              onClick={(e) => {
                                  handleFavoritePlace(e, authToken.email, id);
                                  
                              }}
                          ><FontAwesomeIcon icon={faStar} />+ {favorites}</Button>
                      }
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>

    <ReviewsList id={place.id} />

    </>                  
    
  );
}