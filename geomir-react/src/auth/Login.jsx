import React from 'react';
import { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../userContext";
import { useForm } from "react-hook-form";

export default function Login({ setCanvi }) {
  let navigate = useNavigate();
  let { authToken,setAuthToken } = useContext(UserContext)
 
  let usuaris = JSON.parse(localStorage.getItem("usuaris")) || [];
  const { register, handleSubmit, formState: {errors} } = useForm();

  const checkLogin = ({email,password}) => {
    return usuaris.find(user => user.email === email && user.password === password);
    
  };

  const sendLogin = (data) => {
  
    // data.email, data.password
    let userFound = checkLogin(data)
    if (userFound !== undefined) {
      console.log("Has iniciat correctament");
      
      setAuthToken(userFound)
      localStorage.setItem("authToken", JSON.stringify(userFound))
      navigate("/")
    } else {
      console.log("Email o Password incorrecte");
    }

    console.log("He enviat les Dades:  " + data.email + "/" + data.password);
  };
  return (
    <div className="login-container">
      <h4>Login</h4>
      <form action="">
        <label htmlFor="email">Email</label>
        <input type="text" {...register('email',{
          required:'This field is required',
          minLength: {
            value: 4,
            message: "This fied requires at least 4 character"
          }
        })} id="email" placeholder="Email" 
          />
          {errors.email ? <div>{ errors.email.message}</div> : '' }
          

        <label htmlFor="password">Password</label>
        <input type="password" {...register('password')} id="password" placeholder="Password" 
          />

        <button className="login-button"
          onClick= {handleSubmit(sendLogin)}
          >LOG IN</button>

        <button
          onClick={() => {
            setCanvi(false);
          }}
        >
          Not registered yet? Click here
        </button>
      </form>
    </div>
  );
}