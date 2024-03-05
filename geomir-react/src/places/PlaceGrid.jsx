import React from 'react';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash,faEye } from '@fortawesome/free-solid-svg-icons';

export default function PlaceGrid(props) {
  const userInfo = JSON.parse(localStorage.getItem("authToken"));
  const navigate = useNavigate();
  const handleDelete = () => {
    props.deletePlace(props.element.id);
  };

  return (
    <Card className="izan-contents">
      <Card.Body>
        <Card.Title>{props.element.name || '-'}</Card.Title>
        <Container>
          <Row>
            <Col>
              {props.element.upload ? (
                <Card.Img variant="top" src={props.element.upload} alt={`Imagen de ${props.element.name}`} />
              ) : (
                '-'
              )}
              <Card.Text>
                {props.element.description || '-'}
              </Card.Text>
              <div className="lat-long">Latitud: {props.element.latitude || '-'}</div>
              <div className="lat-long">Longitud: {props.element.longitude || '-'}</div>
              <div className="button-container mt-3">
                {props.element.author.userEmail === userInfo.email ? (
                  <>
                    <Button variant="primary" onClick={() => navigate(`/places/edit/${props.element.id}`)}><FontAwesomeIcon icon={faPen} /></Button>{' '}
                    <Button variant="danger" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></Button>
                  </>
                ) : (
                  <p>sin función</p>
                )}
                {props.element.visibility == 1 || props.element.author.userEmail === userInfo.email ? (
                <>
                    <Button variant="secundari" onClick={() => navigate(`/places/${props.element.id}`)}><FontAwesomeIcon icon={faEye} /></Button>
                </>
                ): (
                ""// <p>No eres autor/ no es publico </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}
