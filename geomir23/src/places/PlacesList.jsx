import React, { useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../userContext';


// Temporal
//import places from '../../json/places.json'
//import users from '../../json/users.json'
import { PlacesAdd } from './PlacesAdd'
import { useEffect } from 'react';
import { PlaceList } from './PlaceList';
import { useDispatch, useSelector } from 'react-redux';

export const PlacesList = () => {

  const [ isLoading, setIsLoading] = useState(false)

  // desa el retorn de dades de l'api places
  const [places, setPlaces] = useState([]);

  // Ho utilitzem per provar un refresc quan esborrem un element
  let [refresh, setRefresh] = useState(false)
  // Dades del context. Ens cal el token per poder fer les crides a l'api
  // let { usuari,authToken } = useContext(UserContext)
  const { usuari,authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch() 


  console.log(usuari)
  //variable d'estado para guardar los places

  useEffect(() => {

    getPlaces()

  }, [])

  //console.log(usuari)

  //
  const getPlaces = async () => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        method: "GET",
      })
      const resposta = await data.json();

      if (resposta.success === true) {
        setPlaces(resposta.data);
        console.log(places)
        console.log(resposta.data)

      } else {
        console.log("La resposta no ha triomfat");
      }
    } catch {
      console.log("Error");
    }
  };


  // Esborrar un element
  const deletePlace = (id, e) => {

    let confirma = confirm("Estas  segur?")

    if (confirma) {
      let nouArray = places.filter(objecte => objecte.id !== id);
      localStorage.setItem('places', JSON.stringify(nouArray));
      setPlaces(nouArray)
      // Esborrem de l'array l'element i actualitem localstorage
    }


  }
  



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
                      Nom
                    </th>
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
                      Favorits
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      👁️📝
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </th>

                  </tr>
                </thead>
                <tbody>

                  {places.map((v) => {
                    return (

                      

                      <>
                        {v.visibility.id == 1 || v.author.name == usuari ? (<PlaceList deletePlace={deletePlace} key={v.id} v={v} />) : <></>}


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
