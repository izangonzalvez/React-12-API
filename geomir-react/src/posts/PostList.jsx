import React from 'react';
import { Button, Table, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash,faEye } from '@fortawesome/free-solid-svg-icons';


export default function PostList(props) {
    let userInfo = JSON.parse(localStorage.getItem("authToken"));
    let { userEmail } = userInfo;
    let navigate = useNavigate();
    //definimos el borrado que hemos enviado atraves de props
    const handleDelete = () => {
      props.deletePost(props.element.id)
    }
    
    return (
      <Table striped bordered hover className="element-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Descripción</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Editar/Esborrar</th>
            <th>Veure</th>
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
                  <Button variant="primary" onClick={() => navigate(`/posts/edit/${props.element.id}`)}><FontAwesomeIcon icon={faPen} /></Button>{' '}
                  <Button variant="danger" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></Button>
                </>
              ) : (
                ""// <p>no funciona</p>
              )}
            </td>
            <td>
              {props.element.visibility == 1 || props.element.author.userEmail === userInfo.email ? (
                <>
                  <Button variant="primary" onClick={() => navigate(`/posts/${props.element.id}`)}><FontAwesomeIcon icon={faEye} /></Button>
                </>
              ): (
                ""// <p>No eres autor/ no es publico </p>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    )
}
