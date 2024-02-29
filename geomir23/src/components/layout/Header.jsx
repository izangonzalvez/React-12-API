import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../userContext';

export const Header = () => {

    let [ roles, setRoles] = useState([]);
    let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
    let token =  JSON.parse(localStorage.getItem('authToken')) || "";
    console.log("hola")
    setAuthToken(token)
    console.log(authToken)
    useEffect ( ()=> {

        fetch("https://backend.insjoaquimmir.cat/api/user", {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
                },
            method: "GET",
        })
            .then((resposta) => resposta.json())
            .then((resposta) => {
                if(resposta.success)
                    console.log(resposta)
                    setUsuari(resposta.user.name)
                    setRoles(resposta.roles)
            })
            .catch((error) => {
                console.log(error);
                alert("Catchch");
            });
        
    },[])

    const logout = (e)=> {

        e.preventDefault();
        setAuthToken("")
        localStorage.removeItem('authToken');
          

        fetch("https://backend.insjoaquimmir.cat/api/logout", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
              },
            method: "POST",
        })
            .then((resposta) => resposta.json())
            .then((resposta) => {
                if(resposta.success)
                    localStorage.removeItem('authToken');
                    setAuthToken(null)
            })
            .catch((error) => {
                console.log(error);
                alert("Catchch");
            });
    }
    
    return (
      <>
  
      <nav className="bg-indigo-400 px-4 p-4">
      <div className="flex items-center justify-between">

          <div className="flex items-center">
          <div class="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white text-xs">GEOMIR</div>


              <div className="pl-9 ">
                  <Link to="/places">Places </Link>  
                  <Link to="/posts">Posts </Link>  
                  <Link to="/about">About </Link>  
              </div>
          </div>
          <div>
              { usuari } <a>(<span></span> { roles.map (  (v)=> (
                            <span key={v}> {v} </span>
                        ) ) })</a>
            ( 
              <a href=""></a>
              <a className="text-orange-800" onClick={logout} href="">Logout</a>)
              
          </div>

      </div>

      </nav>

    
 
     
      </>    
  )
}