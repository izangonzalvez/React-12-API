import React from "react";
import { useEffect } from "react";
import { Comment } from "./Comment";

import { useContext } from "react";
import { UserContext } from "../../userContext";

import { useState } from "react";
import { CommentAdd } from "./CommentAdd";
import { CommentsContext } from "./commentsContext";
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from "./thunks";
import { setCommentsCount } from "./commentsSlice";

// Fem servir un context únicament dins de tots els components de Comments

export const CommentsList = ({ id, comments_count }) => {
  // let {  authToken, setAuthToken } = useContext(UserContext);
  const { usuari,authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch() 
  const { comments = [], page=0, isLoading=true, add, error="", commentsCount=0 } = useSelector((state) => state.comment);

  // Obtenim l'usuari 
  // let usuari =authToken.email
  // let compta 
  
  // let [error, setError] = useState("");
  // const [refresca, setRefresca] = useState(false);
  // const [add, setAdd] = useState(true);
  // const [commentsCount, setCommentsCount] = useState(0);

  // Obtenim els comments de localStorage i iniciem la variable d'estat
  // const [comments, setComments] = useState([JSON.parse(localStorage.getItem("comments")) || []])

  // const [comments, setComments] = useState(JSON.parse(localStorage.getItem("comments")) || [])
  
  
  //  useEffect(() => {

  //   setComments(JSON.parse(localStorage.getItem("comments")) || [])
  //   console.log("aaa")
  //   console.log(comments)

   
  // //   listComments();
  //   setRefresca(false);
  //  }, [refresca]);

  //  useEffect(()=> {

  //   compta=0 
    

    // setTrobats( comments.filter(objecte => objecte.id_post === id));

  //   comments.map((v) => {
  //     console.error(v.user.email, usuari)
  //     if (v.user.email === usuari && v.id_post === id) {
 
  //       setAdd(false);
  //       console.log("Te revdddiew");

  //     }
  //     if (v.id_post === id)
  //         compta++
  //     console.log(compta)
  //   });
  //   setCommentsCount(compta)
  //   //console.warn(trobats)

  //  },[comments])

  useEffect(() => {
    // dispatch(setCommentsCount(comments_count))
    dispatch(getComments(0, id, authToken));
  }, []);
  return (
    
    <>
      {add ? <CommentAdd id={id} /> : <></>}
      <div class="flex mx-auto items-center justify-center  mt-6 mb-4 max-w-lg">
        {commentsCount == 0 ? (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200">
            No hi ha comments
          </div>
        ) : (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-blue-50 px-4 ring-2 ring-blue-200">
            Hi ha {commentsCount} {commentsCount > 1 ? " comment" : " comment"}{" "}
          </div>
        )}
      </div>

      {error ? (
        <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">
          {error}
        </div>
      ) : (
        <></>
      )}

      {comments.map((v) => {
        return <Comment key={v.id} comment={v} />;
      })}

</>
  );
};
