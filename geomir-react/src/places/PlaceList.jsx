import React from 'react';
import { Button, Table, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash,faEye } from '@fortawesome/free-solid-svg-icons';


export default function PostList(props) {
    let userInfo = JSON.parse(localStorage.getItem("authToken"));
    
    let navigate = useNavigate();

    const handleDelete = () => {
      props.deletePlace(props.element.id);
    };

    return (
      <Table striped bordered hover className="element-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Descripción</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Editar/Borrar</th>
            <th>Ver</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.element.name || '-'}</td>
            <td>
              {props.element.upload ? (
                <Image src={props.element.upload} alt={`Imagen de ${props.element.name}`} style={{ maxWidth: '100px' }} />
              ) : (
                '-'
              )}
            </td>
            <td>{props.element.description || '-'}</td>
            <td>{props.element.latitude || '-'}</td>
            <td>{props.element.longitude || '-'}</td>
            <td>
              {props.element.author.userEmail === userInfo.email ? (
                <>
                  <Button variant="primary" onClick={() => navigate(`/places/edit/${props.element.id}`)}><FontAwesomeIcon icon={faPen} /></Button>{' '}
                  <Button variant="danger" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></Button></>
              ) : (
                <p>no funciona</p>
              )}
            </td>
            <td><Button variant="secundari" onClick={() => navigate(`/places/${props.element.id}`)}><FontAwesomeIcon icon={faEye} /></Button></td>
          </tr>
        </tbody>
      </Table>
    )
}