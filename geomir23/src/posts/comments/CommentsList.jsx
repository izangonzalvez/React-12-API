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

// Fem servir un context únicament dins de tots els components de Comments

export const CommentsList = ({ id }) => {
  // let {  authToken, setAuthToken } = useContext(UserContext);
  const { usuari,authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch() 
  const { setRefresca, commentsCount, setCommentsCount, add, error, comments } = useSelector (state => state.comment)

 console.log(comments)
console.log(add)

  useEffect(() => {
    // dispatch(setCommentsCount(comments_count))
    dispatch(getComments(0, id, authToken, usuari));
  }, []);
  return (
    
    <>
    <CommentsContext.Provider
      // value={{ setRefresca, commentsCount, setCommentsCount }}
    >
      {!add ? <CommentAdd id={id} /> : <></>}
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
        return <Comment key={v.id} comment={v} />
      })}
      </CommentsContext.Provider>

    </>
  );
};
