import React from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import TimeAgo from 'react-timeago'

export default function Comment({ element, setComments }) {
    let { authToken } = useContext(UserContext);
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    const deleteComment = (id) => {
        const filteredComments = comments.filter((comment) => comment.user.email !== authToken.email);
        setComments(filteredComments);
        localStorage.setItem('comments', JSON.stringify(filteredComments));
    };

    const handleDelete = () => {
        deleteComment(element.id);
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Row>
                    <Col md={8} sm={12}>
                        <p><strong>{element.user.name}</strong>: {element.comment}<br/><span className="color-time"><TimeAgo date={element.created_at} /></span></p>
                    </Col>
                    {element.user.email === authToken.email && (
                        <Col md={4} sm={12} className="text-md-right text-sm-left">
                            <Button variant="danger" onClick={handleDelete}>
                                <FontAwesomeIcon icon={faTrash} /> Eliminar
                            </Button>
                        </Col>
                    )}
                </Row>
            </Card.Body>
        </Card>
    );
}
