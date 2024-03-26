import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../userContext";
import { v4 as uuidv4 } from 'uuid';
import { Form, Button, Alert } from 'react-bootstrap';

export default function CommentAdd({ setComments, id }) {
    const { authToken } = useContext(UserContext);
    const { name, email } = authToken;
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [commentCreated, setCommentCreated] = useState(false);

    const onSubmit = (commentData) => {
        const newComment = {
            id: uuidv4(),
            post_id: id,
            user: { name, email },
            created_at: Date.now(),
            comment: commentData.comment,
        };

        comments.push(newComment);
        localStorage.setItem("comments", JSON.stringify(comments));
        setComments(comments);
        setCommentCreated(true);
    };

    return (
        <>
            <Form>
                <Form.Group >
                    <Form.Control
                        type="text"
                        {...register("comment", { required: "This field is required",
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
                        placeholder="Write here your comment"
                    />
                    {errors.comment && <p>{errors.comment.message}</p>}
                </Form.Group>
                <Button 
                    variant="primary" 
                    type="button" // Cambia a type="button" para prevenir el envío automático
                    onClick={handleSubmit(onSubmit)} 
                >
                    Enviar
                </Button>
            </Form>

            {commentCreated && 
                console.log('Comment succesfully created')
            }
        </>
    );
}
