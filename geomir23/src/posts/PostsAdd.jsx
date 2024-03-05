import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../userContext';
import 'leaflet/dist/leaflet.css';
import "../App.css";
import { v4 as uuidv4 } from 'uuid';
import { Marker, Popup, MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { useForm } from 'react-hook-form';


export const PostsAdd = ({ setAfegir }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { authToken } = useContext(UserContext);
  const [coordenades, setCoordenades] = useState({ latitude: '0', longitude: '0' });
  const [uploadFile, setUploadFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [position, setPosition] = useState(null)
  // Función para manejar el cambio en la carga de archivos
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtener el archivo seleccionado del evento
  
    // Verificar si se seleccionó un archivo
    if (file) {
      setUploadFile(file); // Actualizar el estado con el archivo seleccionado
    }
  };

  const afegir = async (data) => {
    try {
      const formData = new FormData();
      formData.append("body", data.body);
      formData.append("upload", uploadFile);
      formData.append("latitude", coordenades.latitude);
      formData.append("longitude", coordenades.longitude);
      formData.append("visibility", data.visibility);

     
    console.log(uploadFile)  
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

      const response = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
        method: "POST",
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


  
 useEffect( ()=> {
    
  navigator.geolocation.getCurrentPosition( (pos )=> {

    setCoordenades({

      latitude :  pos.coords.latitude,
      longitude: pos.coords.longitude
  
    })
    
    console.log("Latitude is :", pos.coords.latitude);
    console.log("Longitude is :", pos.coords.longitude);
  });


 },[])


  function LocationMarker() {
    
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        console.log(e.latlng);
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  return (
    <>
     <div className="py-9 pl-9">
    
    <div className="w-1/3">
  <label className="text-gray-600">Descripció</label>
  <textarea 
    {...register("body", {
      required: "Por favor, introdueix la descripció",
      maxLength: {
        value: 255,
        message: "Mida màxima de la descripció, 255 caràcters"
      }
    })} 
    className="
      w-full
      h-32
      px-4
      py-3
      border-2 border-gray-300
      rounded-sm
      outline-none
      focus:border-blue-400
    "
    placeholder="Explica'ns alguna cosa d'aquest lloc..."
  ></textarea>
   {errors.description && <p className="text-red-600 bg-yellow-200 p-2">{errors.description.message}</p>}


  <div className="mb-3 w-96">
    <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600">Imatge PNG, JPG or GIF (MAX. 800x400px)</label>
    <input 
  {...register("upload", {
    required: "Por favor, selecciona un archivo",
    pattern: {
      value: /\.(jpg|jpeg|png|gif)$/i,
      message: "Por favor, selecciona un archivo de imagen válido (JPEG, PNG, GIF)"
    }
  })}
  onChange={handleFileChange} // Agrega este atributo onChange
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
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
  type="file" 
  id="upload"
/>
{errors.upload && <p className="text-red-600 bg-yellow-200 p-2">{errors.upload.message}</p>}
</div>


<span className="flex flex-col gap-y-2">
        <label className="text-gray-600" htmlFor="Name">Longitud</label>
        <input
            type="text"
            {...register("longitude", { required: "Por favor, introduce la longitud" })}
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            value={ coordenades.longitude }
            // Això només si vulguéssim modificar manualment les coordenades
            // onChange={(e) => setCoordenades({ ...coordenades, longitude: e.target.value })}
            
        />
</span>
<span className="flex flex-col gap-y-2">
        <label className="text-gray-600" htmlFor="Name">Latitud</label>
        <input
            type="text"
            {...register("latitude", { required: "Si us plau, introdueix la latitud" })}
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            value={ coordenades.latitude }
            // Això només si vulguéssim modificar manualment les coordenades
            // onChange={(e) => setCoordenades({ ...coordenades, latitude: e.target.value })}
        />
</span>
{errors.latitude && <p className="text-red-600 bg-yellow-200 p-2">{errors.latitude.message}</p>}
<label htmlFor="visibility" className="block mb-2 text-sm text-gray-600 dark:text-white">Selecciona la visibilitat</label>
<select {...register("visibility", { required: "Por favor, introdueix la latitud" })} id="visibility"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option defaultValue value="1">Public</option>
  <option value="2">Contactes</option>
  <option value="3">Privat</option>
  
</select>
<div className="py-9">
<button onClick={handleSubmit(afegir)}  type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
    Afegir Entrada
    </button>
    

    
  </div>
    
  
    
    
    
    
    
    </div>
    {/* </form> */}
    <MapContainer style={{ height: 280 }} center={{ lat: 51.505, lng: -0.09 }} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      
  
  
    </MapContainer>
    </div>
    
    
    
    
    
    </>
  )
}