import { useState } from 'react'
import { useForm } from "react-hook-form";



export default function Register ({setCanvi}) {
  

    let usuaris = JSON.parse(localStorage.getItem("usuaris")) || [];
    const { register, handleSubmit, formState: {errors} } = useForm();

    const checkDuplicates = (data) => {
        
        const duplicateUsers = usuaris.filter(user => user.email === data.email);
        return duplicateUsers.length > 0;
      };


    const sendRegister = (data) => {
        if (checkDuplicates(data)) {
            alert("Este Email ya existe");

        } else {

        usuaris.push(data);
        localStorage.setItem("usuaris", JSON.stringify(usuaris));

        
        alert("Usuario registrado: " + data.age + "/" + data.name + "/" + data.email + "/" + data.password + "/");
    }
    }

    return (
    <div className="register-container">
        <h4>Create your profile</h4>
        <form action="">
            <label htmlFor="Age"></label>
            <input type="number" {...register('age',{
            required: 'This Field is required',
            min: {
                value:18,
                message:'You must be at least 18 years old'
            }})} id="age" placeholder='Age'
            />
            {errors.age ? <div>{errors.age.message}</div> : ''}
            <br />

            <label htmlFor="name"></label>
            <input type="text" {...register('name',{
                required:'this field is required',
                minLength: {
                    value:4,
                    message:"This fied requires at least 4 character"
                },
                pattern:{
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÑñÜü]+(\s[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÑñÜü]+)$/,
                    message: "this Field must contains at least two words"

                }
                
                })} id="name" placeholder='Name'/>
                {errors.name ? <div>{errors.name.message}</div> : ''}
                <br />

            <label htmlFor="email"></label>
            <input type="email" {...register('email',{
                required:'this field is required',
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@(insjoaquimmir\.cat|fp\.insjoaquimmir\.cat)$/,
                    message: 'Use a valid email'
                }
            })} id="email" placeholder='Email'/>
            {errors.email ? <div>{errors.email.message}</div> : ''}
            <br />

            <label htmlFor="password"></label>
            <input type="password" {...register('password',{
                required:'this field is required',
                pattern:{
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Your password must be at least 8 characters long and include a combination of uppercase letters, lowercase letters, numbers, and special characters.'

                }})} id="password" placeholder='Password' />
            {errors.password ? <div>{errors.password.message}</div> : ''}
            <br />

            <button 
                onClick={handleSubmit(sendRegister)}>  
                    REGISTRARSE 
            </button>

            <button onClick={()=>{
                setCanvi(true);
            }}>
                    Already registred? click here
            </button>
        </form>
        
    </div>
  );
}