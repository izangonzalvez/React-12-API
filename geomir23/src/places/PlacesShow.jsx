import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import "leaflet/dist/leaflet.css";

import "../App.css";
import { Icon } from "leaflet";

import { Marker, Popup, MapContainer, TileLayer, useMap } from "react-leaflet";
import { PlacesMenu } from "./PlacesMenu";
import { ReviewAdd } from "./reviews/ReviewAdd";
import { ReviewsList } from "./reviews/ReviewsList";
import { useDispatch, useSelector } from "react-redux";
import { setAdd } from "./reviews/reviewsSlice";


export const PlacesShow = () => {
  
  const { id } = useParams();
  const navigate = useNavigate()

  // let { usuari,authToken} = useContext(UserContext)
  const { usuari,authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch() 
 
  console.log(usuari)

  let [place, setPlace] = useState({});
  let [isLoading, setIsLoading] = useState(true);
  let [favorited, setFavorited] = useState(false);
  let [favorites, setFavorites] = useState(0)
  

      
  useEffect ( ()=> {
  
  
 
    getPlace(id) 
    
  },[])

  const getPlace = async (id) => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        method: "GET",
      })
      const resposta = await data.json();

      if (resposta.success === true) {
        setPlace(resposta.data);
        setIsLoading(false)
        dispatch(setAdd(resposta.data.reviewed))
        console.log(resposta.data.reviewed)
       
        //console.log(place)
        console.log(resposta.data)

      } else {
        console.log("La resposta no ha triomfat");
      }
    } catch(err) {
      console.log(err);
    }
  };


  // const deletePlace = (id,e) => {

  //   let confirma = confirm("Estas  segur?")
  
  //   if (confirma)
  //   {
  //     let nouArray = places.filter(objecte => objecte.id !== id);
  //     localStorage.setItem('places', JSON.stringify(nouArray));

  //     // Caldrà esborrar els reviews per a aquest place
  //     let reviews =  JSON.parse(localStorage.getItem('reviews')) || []
  //     let nouArray2 = reviews.filter(objecte => objecte.id_place !== id);
  //     localStorage.setItem('reviews', JSON.stringify(nouArray2));





  //     navigate("/places/")
  //     //setPlaces(nouArray)
  //     // Esborrem de l'array l'element i actualitem localstorage
      
  //   }
  
  // }

  // const favourite = (id,e)=> {

  //     e.preventDefault()
  //     console.log(places[index])

  //     // index, és l'index de places que hem de modificar      
  //     if (places[index].favorites == undefined)
  //     {
  //       places[index].favorites = []  
  //     }
  //     places[index].favorites.push(authToken.email)

  //     localStorage.setItem('places', JSON.stringify(places));

    
  //     setFavorited(true)
  //     setFavorites(favorites+1)

      
  //     console.log(places[index])



  // }
  // const unfavourite = (id,e)=> {

  //   e.preventDefault()

  //   console.log("ddsdssds")
  //   if (places[index].favorites == undefined)
  //     {  //Aquí no s'hauria d'arrivar
  //       console.log("mal si entres aqui")
  //       places[index].favorites = []  
  //     }
  //   else {
  //     console.log("BÉ!! si entres aqui")

  //     let trobats = places[index].favorites.filter(objecte => objecte != authToken.email && objecte != null);
  //     console.log(trobats)
  //     places[index].favorites = [...trobats]
  //     localStorage.setItem('places', JSON.stringify(places));
  //     console.log(places[index].favorites)
  //     setFavorited(false)
  //     setFavorites(favorites - 1)
  

  //   }

  // }
  

  return (
    <>
     
      {isLoading ? (
        "Espera...."
      ) : (
        <>
          <div className="md:grid md:grid-col-1 md:grid-flow-row gap-4 md:mx-auto p-6 justify-center dark:bg-gray-900 dark:text-gray-100">
            <div className="relative overflow-hidden bg-no-repeat bg-cover col-span-1 ">
              <img
                src={
                  "https://backend.insjoaquimmir.cat/storage/" +place.file.filepath
                }
                alt=""
                className=" col-span-1 w-200 h-96 items-center"
              />

              <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-40 transition duration-300 ease-in-out bg-white"></div>
            </div>

            <div className="max-w-xl">
              <h2 className="bg-blue-300 col-span-1 text-xl font-semibold">
                {place.name}
              </h2>
              <span className="bg-blue-200 col-span-1 block pb-2 text-sm dark:text-gray-400">
                Enviada per: {place.author.name}
              </span>
              <span className="self-center   px-9 bg-gray-200 col-span-2 text-x2 font-semibold">
                Latitud: {place.latitude}{" "}
              </span>
              <span className="self-center px-7 bg-gray-200 text-x2 font-semibold">
                Longitud: {place.longitude}
              </span>

              <div className="bg-orange-100 py-3 text-x2 font-semibold">
                Descripció
              </div>
              <p className=" bg-yellow-100">{place.description}</p>
              <div className="mt-10 h-12 max-h-full md:max-h-screen">
               

                {place.author.email === authToken.email ? (
                  <>
                    <Link
                      to={"/places/edit/" + id}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-10 px-4 h-10 md:h-10 uppercase"
                    >
                      {" "}
                      Editar{" "}
                    </Link>
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                      onClick={(e) => deletePlace(id, e)}
                    >
                      {" "}
                      Esborrar
                    </a>
                  </>
                ) : (
                  <></>
                )}
                
                
          

             
                { <ReviewsList
                  id={place.id}
                  // reviews_count={place.reviews_count}
                /> }
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
