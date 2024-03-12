import reactLogo from './assets/react.svg'
import './App.css'
import { LoginRegister } from './auth/LoginRegister'
import { useState, useEffect } from 'react'
//import { createContext } from 'react'

import { UserContext } from './userContext'
import { Routes,Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Places } from './places/Places'
import { PlacesShow } from './places/PlacesShow'
import { About } from './components/aplicacio/About'
import { NotFound } from './components/aplicacio/NotFound'
import { PlaceEdit } from './places/PlaceEdit'
import { PlacesAdd } from './places/PlacesAdd'
import { PlacesMenu } from './places/PlacesMenu'
import { PlaceGrid } from './places/PlaceGrid'
import { PlacesGrid } from './places/PlacesGrid'
import { PlacesList } from './places/PlacesList'
import { Posts } from './posts/Posts'
import { PostsMenu } from './posts/PostsMenu'
import { PostsList } from './posts/PostsList'
import { PostsGrid } from './posts/PostsGrid'
import { PostsAdd } from './posts/PostsAdd'
import { Post } from './posts/Post'
import { PostEdit } from './posts/PostEdit'

import dades from './dades.json'
import revis from './reviews.json'
import usus from './usuaris.json'
import { useDispatch, useSelector } from 'react-redux'
// "leaflet": "^1.9.3",
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0",
//     "react-leaflet": "^4.2.0",
//     "react-leaflet-marker": "^2.1.0",
//     "react-router-dom": "^6.4.3"
function App() {

  // let [usuari, setUsuari] = useState("");
  // let [ authToken,setAuthToken] = useState("");
  //aqui recogemos los datos con el slicer
  const { usuari,authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch()


  useEffect(() => {
    // Desa les receptes a localStorage només si no hi ha cap recepta desada encara
    if (!localStorage.getItem('places')) {
      localStorage.setItem('places', JSON.stringify(dades));
    }
    if (!localStorage.getItem('reviews')) {
      localStorage.setItem('reviews', JSON.stringify(revis));
    }
    if (!localStorage.getItem('usuaris')) {
      localStorage.setItem('usuaris', JSON.stringify(usus));
    }
  }, []);






  

  return (
   <>

    {/* <UserContext.Provider value= { { usuari, setUsuari,authToken,setAuthToken }}> */}
      
      { authToken != "" ? (
      
        <>
        <Header/>
      
         <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path="/" element={<Places />}/>
            <Route path="/places" element={<Places />} />
            <Route path="/places/list" element={ <><PlacesMenu/><PlacesList /></> } /> 
            <Route path="/places/grid" element={ <><PlacesMenu/><PlacesGrid /></> } /> 
            <Route path="/places/add" element={ <><PlacesMenu/><PlacesAdd /></> } /> 
            <Route path="/places/edit/:id" element={  <><PlacesMenu/><PlaceEdit /></> } />
            <Route path="/places/:id" element={ <><PlacesMenu/><PlacesShow /></> } /> 

            <Route path="/posts" element={<Posts/>} />
            <Route path="/posts/list" element={ <><PostsMenu/><PostsList/></> } /> 
            <Route path="/posts/grid" element={ <><PostsMenu/><PostsGrid/></> } /> 
            <Route path="/posts/add" element={ <><PostsMenu/><PostsAdd/></> } /> 
            <Route path="/posts/edit/:id" element={  <><PostsMenu/><PostEdit /></> } />
            <Route path="/posts/:id" element={ <><PostsMenu/><Post/></> } /> 
            
            
            
             {/* <Route path="/posts" element={ <Places />} />
            <Route path="/posts/:id" element={<PlacesShow />} /> */}
            <Route path="/about" element={<About />} />
        </Routes>

        {/* <Footer/> */}
       </>

    ) :  <LoginRegister /> }
    
    {/* </UserContext.Provider> */}

      {/* <LoginRegister/> */}
   </>
  
  )
}

export default App

