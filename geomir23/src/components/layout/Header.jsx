import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../userContext';

export const Header = () => {

    let { authToken,setAuthToken } = useContext(UserContext)
    let [ usuari,setUsuari] = useState("")
    let [ roles, setRoles] = useState([]);
    let { name,email } = authToken


    

    
    const logout = (e)=> {

        e.preventDefault();
        setAuthToken("")
        localStorage.removeItem('authToken');





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
              { name } ( 
              {/* { roles.map ((v)=> ( <span key={v}> {v} </span>))}) -  */}
              <a className="text-orange-800" onClick={logout} href="">Logout</a>)
              
          </div>

      </div>

      </nav>

    
 
     
      </>    
  )
}
