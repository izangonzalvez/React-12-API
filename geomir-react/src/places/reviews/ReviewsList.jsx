import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext";
import ReviewAdd from "./ReviewAdd";
import Review from "./Review";

export default function ReviewsList({ id }) {
    const { authToken } = useContext(UserContext);
    const [reviews, setReviews] = useState(JSON.parse(localStorage.getItem('reviews')) || []);
    const [reviewed, setReviewed] = useState(false);
    
    useEffect(() => {
        const localReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const userReviewed = localReviews.some(element => element.user.email === authToken.email && element.place_id === id);
        setReviewed(userReviewed);
    }, [reviews, authToken.email, id]);

    return (
        <>
            <h2>Reviews</h2>
            {reviews.map((element) => 
                element.place_id === id && <Review key={element.id} element={element} setReviews={setReviews} />
            )}
            {!reviewed && <ReviewAdd setReviews={setReviews} id={id} />}
        </>
    );
}
