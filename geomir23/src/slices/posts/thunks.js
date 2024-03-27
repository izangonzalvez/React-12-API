import { setAdd, setError, setPosts, setPost,setPostsCount, startLoadingPosts  } from "./postSlice";

export const getPosts = (page = 0, id, authToken, usuari="") => {
    return async (dispatch, getState) => {
        dispatch(startLoadingPosts());
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts"
        const data = await fetch(url,  headers  );
        const resposta = await data.json();
        if (resposta.success == true)
        {
            dispatch(setPosts(resposta.data));
        }
        else {
            dispatch (setError(resposta.message));
        }
        resposta.data.map((v) => {
            if (v.user && v.user.email && v.user.email === usuari) {
                dispatch(setAdd(false));
                console.log("Te post");
            }
        }); 
};
}
export const delPost = (id, authToken) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" + id,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
              }
          );
          const resposta = await data.json();
        console.log(id);
          console.log(resposta);
          if (resposta.success == true) {
            dispatch (setAdd(true));
            dispatch (getPosts(0,id,authToken))
            const state = getState()
            dispatch (setPostsCount(state.postCount - 1));
          }


    };
};

export const addPost = (data, authToken) => {
    return async (dispatch, getState) => {
      let {name,body,upload,latitude,longitude,visibility}=data;
      let formData = new FormData();
  
      formData.append('name', name),
      formData.append('body', body),
    //   formData.append('upload', upload),
      formData.append('latitude', latitude),
      formData.append('longitude', longitude)
      formData.append('visibility', visibility)

      if (upload && upload.length > 0) {
        formData.append('upload', upload[0]);
      }
      console.log(formData)
      
      const dataFetch = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        method: "POST",
        body: formData
      })
      const response = await dataFetch.json()
  
      if (response.succes == true) {
        console.log(response)
      
      } else {
        dispatch(setError(response))
      }
    };
  };

  export const editPosts = (id, info, authToken) => {
    console.log(info)
    return async (dispatch, getState) => {
      Number(info.latitude)
      Number(info.longitude)
      const formData = new FormData();
      formData.append("body", info.body);
      formData.append("latitude", info.latitude);
      formData.append("longitude", info.longitude);
      formData.append("visibility", info.visibility);
      
      if (info.upload) {
        formData.append("upload", info.upload[0]);
      }
  
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
      try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          },
          body: formData
        });
  
        const response = await data.json();
        if (response.success) {
          console.log(response)
          console.log('¡El formulario se ha enviado con éxito!');
          // Aquí deberías despachar una acción de Redux para actualizar el estado local con la nueva información, si es necesario.
        } else {
          console.error('Error al editar el post:', response);
          // Aquí podrías despachar una acción de Redux para manejar el error, si es necesario.
        }
      } catch (error) {
        console.error('Error al editar el post:', error);
        // Aquí podrías despachar una acción de Redux para manejar el error, si es necesario.
      }
    };
  };

  