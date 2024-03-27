import React from "react";
import { useEffect } from "react";
import { Review } from "./Review";

import { useContext } from "react";
import { UserContext } from "../../userContext";

import { useState } from "react";
import { ReviewAdd } from "./ReviewAdd";
import { ReviewsContext } from "./reviewsContext";
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from "./thunks";
// Fem servir un context únicament dins de tots els components de Reviews

export const ReviewsList = ({ id }) => {
 

  const { usuari,authToken } = useSelector (state => state.auth)
  const { setAdd, setRefresca, reviewsCount, setReviewsCount, add, error, reviews } = useSelector (state => state.review)
  const dispatch = useDispatch() 
  // Obtenim els reviews de localStorage i iniciem la variable d'estat
  // const [reviews, set

  console.log
  useEffect(()=>{
    dispatch(getReviews(0,id,authToken, usuari))
  }, [])
  
  return (
    
    <>
    <ReviewsContext.Provider
      // value={{ setAdd, setRefresca, reviewsCount, setReviewsCount }}
    >
      {!add ? <ReviewAdd id={id} /> : <></>}
      <div class="flex mx-auto items-center justify-center  mt-6  mb-4 max-w-lg">
        {reviewsCount == 0 ? (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200">
            No hi ha reviews
          </div>
        ) : (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-blue-50 px-4 ring-2 ring-blue-200">
            Hi ha {reviewsCount} {reviewsCount > 1 ? " ressenyes" : " ressenya"}{" "}
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

      {reviews.map((v) => {

        return <Review key={v.id} review={v} />
         
      })}
      </ReviewsContext.Provider>
    </>
  );
};
