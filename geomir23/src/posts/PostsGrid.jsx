import React, { useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../userContext';
import editar from "../assets/editar.png"
import esborrar from "../assets/esborrar.png"
import { PostsAdd } from './PostsAdd'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostGrid } from './PostGrid';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../slices/posts/thunks';

export const PostsGrid = ({id}) => {


  // let [ posts, setPosts ] = useState ([]);

  const { usuari,authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch() 

  const { setAdd, setRefresca, postsCount, setPostsCount, add, error, posts } = useSelector (state => state.post)

  useEffect(() => {
    dispatch(getPosts(0, id, authToken, usuari));
  }, []);



  return (
   <>

  
 
<div className="py-16 bg-gradient-to-br from-green-50 to-cyan-100">  
  <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div className="mb-12 space-y-2 text-center">
        <span className="block w-max mx-auto px-3 py-1.5 border border-green-200 rounded-full bg-green-100 text-green-600 text-4x1">Llistat de Llocs</span>
        {/* <h2 className="text-2xl text-cyan-900 font-bold md:text-4xl">Sharing is Caring</h2>
        <p className="lg:w-6/12 lg:mx-auto">Quam hic dolore cumque voluptate rerum beatae et quae, tempore sunt, debitis dolorum officia aliquid explicabo? Excepturi, voluptate?</p> */}
      </div>

      

          <div className="grid gap-12 lg:grid-cols-2">
          { posts.map( (v,i)=> { return (   
                       
            <>
            { v.visibility.id == 1 || v.author.name == usuari ? ( <PostGrid key={v.id} v={v}/>) : <></> }
           
          
            </>
       
        )})}
        
     

        
      </div>
  </div>
</div>
</>
  )
}
