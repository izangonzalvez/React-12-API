import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';


export const PlaceEdit = () => {
    const { register, handleSubmit, formState: { errors }, reset, setValue} = useForm();
    const { id } = useParams();
    let navigate = useNavigate();
    let [place, setPlace] = useState({});

   
    const handleFileChange = (e) => {
      const file = e.target.files[0]; // Obtener el archivo seleccionado del evento
    
      // Verificar si se seleccionó un archivo
      if (file) {
        setUploadFile(file); // Actualizar el estado con el archivo seleccionado
      }
    };
  
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
          //console.log(place)
          console.log(resposta.data)
          console.log(place.file.filepath)
  
        } else {
          console.log("La resposta no ha triomfat");
        }
      } catch {
        console.log("Error");
      }
    };
    
    const editar = async (data) => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("upload", uploadFile);
        formData.append("latitude", coordenades.latitude);
        formData.append("longitude", coordenades.longitude);
        formData.append("visibility", data.visibility);
  
        console.log(uploadFile)  
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
  
        const response = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id, {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: formData
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          setSuccessMessage('¡El formulario se ha enviado con éxito!');
          reset(); // Limpiar formulario
          setUploadFile(null); // Limpiar archivo cargado
        } else {
          setErrorMessage(responseData.message || 'Error al enviar el formulario');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error al enviar el formulario');
      }
    };
  
  
    
    useEffect(() => {  
      getPlace(id)
      navigator.geolocation.getCurrentPosition((pos) => {
        setCoordenades({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        })
        console.log("Latitude is :", pos.coords.latitude);
        console.log("Longitude is :", pos.coords.longitude);
      });
    }, [])


  return (
   
    <>
      <div className="py-9 pl-9">
        <form onSubmit={handleSubmit(editar)} encType="multipart/form-data">
          <div className="py-9 flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              {...register('name')}
              defaultValue={formulari.name}
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            />
          </div>
          <div className="w-1/3">
            <label className="text-gray-600">Descripció</label>
            <textarea
              name="description"
              {...register('description')}
              defaultValue={formulari.description}
              className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-sm outline-none focus:border-blue-400"
              placeholder="Explica'ns alguna cosa d'aquest lloc..."
            ></textarea>
          </div>
          <div className="flex justify-center">
            <div className="mb-3 w-96">
              <label htmlFor="upload" className="form-label inline-block mb-2 text-gray-600">Imatge PNG, JPG or GIF (MAX. 800x400px)</label>
              <input
                {...register('upload')}
                onChange={handleChange}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="upload"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="longitude">Longitud</label>
            <input
              type="text"
              name="longitude"
              {...register('longitude')}
              defaultValue={formulari.longitude}
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="latitude">Latitud</label>
            <input
              type="text"
              name="latitude"
              {...register('latitude')}
              defaultValue={formulari.latitude}
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            />
          </div>
          <label htmlFor="visibility" className="block mb-2 text-sm text-gray-600 dark:text-white">Selecciona la visibilitat</label>
          <select
            name="visibility"
            {...register('visibility')}
            defaultValue={formulari.visibility}
            id="visibility"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">----</option>
            <option value="1">Public</option>
            <option value="2">Contactes</option>
            <option value="3">Privat</option>
          </select>
          <div className="py-9">
            {error && (<div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 mb-4 px-4 ring-2 ring-red-200 ">{error}</div>)}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Editar Entrada
            </button>
            <button onClick={() => navigate(-1)} type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
