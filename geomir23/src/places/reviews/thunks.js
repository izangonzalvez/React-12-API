import { setAdd, setError, setReviews, setReviewsCount, startLoadingReviews } from "./reviewsSlice";

export const getReviews = (page = 0, id, authToken, usuari="") => {
    return async (dispatch, getState) => {
        dispatch(startLoadingReviews());
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews"
        const data = await fetch(url,  headers  );
        const resposta = await data.json();
        if (resposta.success == true)
        {
            dispatch(setReviews(resposta.data));
            console.log(resposta.data)
            dispatch(setReviewsCount(resposta.data.length))
        }
        else {
            dispatch (setError(resposta.message));
        }
        resposta.data.map((v) => {
            if (v.user.email === usuari) {
                
                console.log("Te review");
            }
        });
        
    
};

}
export const addReview = (id, authToken, review) => {
    return async (dispatch) => {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews";
      
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(review)
            });
            const responseData = await response.json();
            if (response.ok) {
                dispatch(setAdd(true));
                dispatch(setReviewsCount(responseData.data.length));
                dispatch(getReviews(0,id,authToken))
            } else {
                dispatch(setError(responseData.message));
            }
        } catch (error) {
            dispatch(setError(error.message));
        }
    };
};