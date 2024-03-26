import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';

export default function PostAdd() {
    let userInfo = JSON.parse(localStorage.getItem("authToken"));
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let { name: userName, email: userEmail } = userInfo;

    const [formData, setFormData] = useState({
        id: uuidv4(),
        name: '',
        description: '',
        upload: '',
        latitude: '',
        longitude: '',
        visibility: '1',
        author: { userName, userEmail },
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setFormData((localizacion) => ({
                ...localizacion,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            }));
            console.log("Latitude is :", pos.coords.latitude);
            console.log("Longitude is :", pos.coords.longitude);
        });
    }, []);

    const [postCreated, setPostCreated] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        posts.push(formData);
        localStorage.setItem("posts", JSON.stringify(posts));
        setPostCreated(true);

        setFormData({
            ...formData,
            id: uuidv4(),
            name: '',
            description: '',
            upload: '',
            visibility: '1',
        });
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card>
                        <Card.Header as="h5">Crear Nuevo Post</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Introduce el nombre del post"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicDescription">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Añade una descripción"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicUpload">
                                    <Form.Label>Archivo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="URL de la imagen o archivo"
                                        name="upload"
                                        value={formData.upload}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicLocation">
                                    <Form.Label>Ubicación</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                type="number"
                                                placeholder="Latitud"
                                                name="latitude"
                                                value={formData.latitude}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="number"
                                                placeholder="Longitud"
                                                name="longitude"
                                                value={formData.longitude}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group controlId="formBasicVisibility">
                                    <Form.Label>Visibilidad</Form.Label>
                                    <Form.Control as="select" name="visibility" value={formData.visibility} onChange={handleChange}>
                                        <option value="1">Público</option>
                                        <option value="2">Contactos</option>
                                        <option value="3">Privado</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button variant="primary" type="submit">Crear Post</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {postCreated && <Alert variant="success" className="mt-3">¡Post creado con éxito!</Alert>}
        </Container>
    );
}
