import React, { useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../userContext';


import { PostsAdd } from './PostsAdd'
import { useEffect } from 'react';
import { PostList } from './PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../slices/posts/thunks';

export const PostsList = ({id}) => {

 
  const { usuari,authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch() 
  const { setAdd, setRefresca, postsCount, setPostsCount, add, error, posts } = useSelector (state => state.post)


  useEffect(() => {
    dispatch(getPosts(0, id, authToken, usuari));
  }, []);






  return (
   <>

  
 
  <div className="flex flex-col">
  <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-white border-b">
            <tr>
            
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Descripció
              </th>
            
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Latitud
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Longitud
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Visibilitat
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Autoria
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Likes
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                👁️📝
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </th>

            </tr>
          </thead>
          <tbody>

            { posts.map( (v )=> { return (
            
            <>
            { v.visibility.id == 1 || v.author.name == usuari ? (<PostList key={v.id} v={v}/>) : <></> }
            
          
            </>
            )

            })}
            
            
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    
   
    
    </>
  )
}