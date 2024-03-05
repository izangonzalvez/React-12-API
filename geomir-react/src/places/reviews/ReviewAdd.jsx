import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../userContext";
import { v4 as uuidv4 } from 'uuid';
import { Form, Button, Alert } from 'react-bootstrap';

export default function ReviewAdd({ setReviews, id }) {
    const { authToken } = useContext(UserContext);
    const { name, email } = authToken;
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [reviewCreated, setReviewsCreated] = useState(false);

    const onSubmit = (reviewData) => {
        const newReview = {
            id: uuidv4(),
            place_id: id,
            user: { name, email },
            created_at: Date.now(),
            review: reviewData.review,
        };

        reviews.push(newReview);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        setReviews(reviews);
        setReviewCreated(true);
    };

    return (
        <>
            <Form>
                <Form.Group >
                    <Form.Control
                        type="text"
                        {...register("review", { required: "This field is required",
                    minLength:{
                        value: 20,
                        message: 'This field must contains at least 20 characters'
                    },
                    maxLength: {
                        value: 200,
                        message:'This field has to contain less than 200 characters'
                    },
                    pattern: {
                        value: /^(\b\w+\b\s*){3,}/,
                        message: 'You need te write at least 3 words'
                    } })}
                        placeholder="Write here your review"
                    />
                    {errors.review && <p>{errors.review.message}</p>}
                </Form.Group>
                <Button 
                    variant="primary" 
                    type="button"
                    onClick={handleSubmit(onSubmit)} 
                >
                    Enviar
                </Button>
            </Form>

            {reviewCreated && 
                console.log('Review succesfully created')
            }
        </>
    );
}
