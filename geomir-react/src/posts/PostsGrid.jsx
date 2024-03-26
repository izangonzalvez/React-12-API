import PostGrid from "./PostGrid";
import { useState } from "react";

import { Container } from "react-bootstrap";

export default function PostsGrid(){

    let userInfo = JSON.parse(localStorage.getItem("authToken"));
    let { name: userName, email: userEmail } = userInfo;
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts')) || []);   
    const deletePost = (id) => {
        //lista de post donde no esta el borrado
        const postsFiltrados= posts.filter((post) => post.id !== id);
        setPosts(postsFiltrados)//aqui la lista de los posts filtrados se convierte en la lista posts
        localStorage.setItem('posts', JSON.stringify(postsFiltrados))
    }
   
 
    return <Container className="adri-cards"> 
      {(
        posts.map( (element, index ) => { return (
            <>
            { element.visibility == 1 || element.userEmail == userEmail ? (<PostGrid key={element.id} element={element} deletePost={deletePost}/>) : <></> 
            }
                 
          </>
            )
    }))}
    </Container>
}