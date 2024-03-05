import PostList from "./PostList";
import { useState } from "react";


export default function PostsList(){

    let userInfo = JSON.parse(localStorage.getItem("authToken"));
    let { name: userName, email: userEmail } = userInfo;
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts')) || []);   
    const deletePost = (id) => {
        //lista de post donde no esta el borrado
        const postsFiltrados= posts.filter((post) => post.id !== id);
        setPosts(postsFiltrados)//aqui la lista de los posts filtrados se convierte en la lista posts
        localStorage.setItem('posts', JSON.stringify(postsFiltrados))
    }
   
 
    return (
        
            posts.map( (element ) => { return (
                <>
                { element.visibility == 1 || element.author.userEmail == userEmail ? (<PostList key={element.id} element={element} deletePost={deletePost}/>) : <></> 
                }
                    
            </>
                )
    }))
}