import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { editPosts } from '../slices/posts/thunks';

export const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [coordenades, setCoordenades] = useState({ latitude: '0', longitude: '0' });
  const { authToken } = useSelector(state => state.auth);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoordenades({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      const editedData = {
        ...data,
        latitude: coordenades.latitude,
        longitude: coordenades.longitude
      };
      console.log(editedData)
      await dispatch(editPosts(id, editedData, authToken));
      navigate(-1); // Redirigir después de editar
    } catch (error) {
      console.error('Error al editar el post:', error);
    }
  };
  

  return (
    <div className="py-9 pl-9">
      <div className="w-1/3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-600">Descripción</label>
          <textarea
            {...register('body', { required: 'Por favor, introduce la descripción' })}
            className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-sm outline-none focus:border-blue-400"
            placeholder="Explica'ns alguna cosa d'aquest lloc..."
          ></textarea>
          {/* Mostrar errores */}
          {errors.body && <p className="text-red-600 bg-yellow-200 p-2">{errors.body.message}</p>}

          <div className="flex justify-center">
  <div className="mb-3 w-96">
    <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600">Imatge PNG, JPG or GIF (MAX. 800x400px)</label>
    <input name="upload" 
    className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="upload"/>
  </div>  
</div>
          <span className="flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="Name">Longitud</label>
            <input
              type="text"
              value={coordenades.longitude}
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
              readOnly
            />
          </span>

          <span className="flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="Name">Latitud</label>
            <input
              type="text"
              value={coordenades.latitude}
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
              readOnly
            />
          </span>

          <label htmlFor="visibility" className="block mb-2 text-sm text-gray-600 dark:text-white">Selecciona la visibilidad</label>
          <select {...register('visibility')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option defaultValue value="">----</option>
            <option value="1">Public</option>
            <option value="2">Contactes</option>
            <option value="3">Privat</option>
          </select>

          <div className="py-9">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Editar Entrada
            </button>
            <button onClick={() => navigate(-1)} type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-2">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
