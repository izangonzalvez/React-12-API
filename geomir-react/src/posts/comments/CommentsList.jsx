import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext";
import CommentAdd from "./CommentAdd";
import Comment from "./Comment";

export default function CommentsList({ id }) {
    const { authToken } = useContext(UserContext);
    const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments')) || []);
    const [commented, setCommented] = useState(false);
    
    // Actualiza 'localComments' para reflejar los cambios en 'comments'
    useEffect(() => {
        const localComments = JSON.parse(localStorage.getItem('comments')) || [];
        const userCommented = localComments.some(element => element.user.email === authToken.email && element.post_id === id);
        setCommented(userCommented);
    }, [comments, authToken.email, id]);

    return (
        <>
            <h2>Comentarios</h2>
            {comments.map((element) => 
                element.post_id === id && <Comment key={element.id} element={element} setComments={setComments} />
            )}
            {!commented && <CommentAdd setComments={setComments} id={id} />}
        </>
    );
}
