import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row, Container, Image } from 'react-bootstrap';
import { useState, useContext, useEffect } from "react";
import CommentsList from "./comments/commentsList";
import { UserContext } from "../userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash,faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Post() {
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts')) || []);   
    const { id } = useParams();
    const { authToken } = useContext(UserContext);
    let postEspecifico = posts.filter(element => element.id === id)[0]
    let [post, setPost] = useState(postEspecifico);
    let userInfo = JSON.parse(localStorage.getItem("authToken"));
    let navigate = useNavigate();
    let likeList = JSON.parse(localStorage.getItem("likes")) || [];
    let like = [];
    let [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        like = likeList.filter(object => object.id === id);
        setLikes(like.length);
        likeList.forEach((element) => {
            if (authToken.email === element.author && element.id === id) {
                setLiked(true);
            }
        });
    }, [liked, likeList, id, authToken.email]);

    const deletePost = (id) => {
        const postsFiltrados = posts.filter((post) => post.id !== id);
        setPosts(postsFiltrados);
        localStorage.setItem('posts', JSON.stringify(postsFiltrados));
        navigate(-1);
    };

    const handleDelete = () => {
        deletePost(post.id);
    };

    const handleLikePost = (e, author, id) => {
        e.preventDefault();
        likeList.push({ id, author });
        localStorage.setItem("likes", JSON.stringify(likeList));
        setLiked(true);  
    };

    const handleDeleteLike = (e, author, id) => {
        e.preventDefault();
        likeList = likeList.filter(element => !(element.author === authToken.email && element.id === id));
        localStorage.setItem("likes", JSON.stringify(likeList));
        setLiked(false);
    };

    return (
        <Container>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>{post.name || '-'}</Card.Title>
                    <Row>
                        <Col md={6} sm={12}>
                            {post.upload ? (
                                <Image src={post.upload} alt={`Imagen de ${post.name}`} fluid />
                            ) : (
                                '-'
                            )}
                        </Col>
                        <Col md={6} sm={12}>
                            <Card.Text>
                                {post.description || '-'}
                            </Card.Text>
                            <div className="lat-long">Latitud: {post.latitude || '-'}</div>
                            <div className="lat-long">Longitud: {post.longitude || '-'}</div>
                            <div className="button-container mt-3">
                                {post.author.userEmail === authToken.email ? (
                                    <>
                                        <Button variant="primary" onClick={() => navigate(`/posts/edit/${post.id}`)}><FontAwesomeIcon icon={faPen} /></Button>{' '}
                                        <Button variant="danger" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </>
                                ) : (
                                    ''
                                )}
                                {liked ?  
                                    <div><Button variant="outline-secondary"
                                        onClick={(e) => {
                                            handleDeleteLike(e, authToken.email, id);
                                        }}
                                    >-<FontAwesomeIcon icon={faHeart} /> {likes}</Button></div> 
                                    : <Button variant="outline-secondary"
                                        onClick={(e) => {
                                            handleLikePost(e, authToken.email, id);
                                        }}
                                    >+<FontAwesomeIcon icon={faHeart} /> {likes}</Button>
                                }
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <CommentsList id={post.id} />
        </Container>
    );
}
