import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row, Container, Image } from 'react-bootstrap';
import { useState, useContext, useEffect } from "react";
import CommentsList from "./comments/CommentsList";
import { UserContext } from "../userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';
import { TextToSpeech } from "../speechSynthesis/SpeechController";
import { TextToSpeechDoubleClick } from "../speechSynthesis/DoubleClickController";
import { useSpeechSynthesis } from "react-speech-kit";

export default function Post() {
    const { id } = useParams();
    const { authToken , username} = useContext(UserContext);
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts')) || []);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [post, setPost] = useState(posts.find(element => element.id === id));
    const navigate = useNavigate();
    const likeList = JSON.parse(localStorage.getItem("likes")) || [];
    const { speak } = useSpeechSynthesis(); // Importante: asegúrate de tener este hook aquí
    console.log()
    useEffect(() => {
        const like = likeList.filter(object => object.id === id);
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
        const updatedLikeList = likeList.filter(element => !(element.author === authToken.email && element.id === id));
        localStorage.setItem("likes", JSON.stringify(updatedLikeList));
        setLiked(false);
    };

    const handleDoubleClick = () => {
        const textsToSpeak = [
            post.description || '-',
            `Latitud: ${post.latitude || '-'}`,
            `Longitud: ${post.longitude || '-'}`,
        ];

        textsToSpeak.forEach(text => {
            speak({ text });
        });
    };

    const handleSpeakUsername = () => {
        speak({ text: `Estás identificado como ${username}` });
      };
    
      useEffect(() => {
        const handleKeyDown = e => {
          if (e.ctrlKey && e.altKey && e.key === 's') {
            handleSpeakUsername();
          }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [handleSpeakUsername]);

    return (
        <Container>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>{post.name || '-'}</Card.Title>
                    <Row>
                        <Col md={6} sm={12} onDoubleClick={handleDoubleClick}>
                            {post.upload ? (
                                <div>
                                    <Image src={post.upload} alt={`Imagen de ${post.name}`} fluid />
                                    <TextToSpeechDoubleClick text={post.description || '-'} />
                                    <TextToSpeechDoubleClick text={`Latitud: ${post.latitude || '-'}`} />
                                    <TextToSpeechDoubleClick text={`Longitud: ${post.longitude || '-'}`} />
                                </div>
                            ) : (
                                '-'
                            )}
                        </Col>
                        <Col md={6} sm={12}>
                            <Card.Text>
                                <TextToSpeech text={post.description || '-'} />
                            </Card.Text>
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
