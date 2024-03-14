import { setAuthToken, setUsuari } from "./authSlice";

export const doLogin = (dades) => {

    return async (dispatch, getState) => {
           const { email, password } = dades
           // Enviem dades a l'aPI i recollim resultat
           try {
               const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
                   headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                       //"Access-Control-Allow-Origin": "*" 
                   },
                   method: "POST",
                   body: JSON.stringify({ email: email, password: password })
               })
               const resposta = await data.json()
               if (resposta.success == true) {
                   localStorage.setItem('authToken', JSON.stringify(resposta.authToken));
                   dispatch(setUsuari(email));
                   dispatch(setAuthToken(resposta.authToken));
               }
               else {
                   // Aquest és un estat que no està a l'Slice
                   // Per tant convindria crear-ne un
                   // I treure el del component
                   // dispatch(setError(resposta.message));
               }
           }
           catch (err) {
               // dispatch(setError("Network error"))
           }
       }

       
    }

    export const doRegister = (data) => {
        return async (dispatch) => {
            const { name, email, password } = data;
    
            try {
                const response = await fetch("https://backend.insjoaquimmir.cat/api/register", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({ name, email, password })
                });
    
                const responseData = await response.json();
    
                if (response.ok) {
                    localStorage.setItem('authToken', JSON.stringify(responseData.authToken));
                    dispatch(setUsuari(email));
                    dispatch(setAuthToken(responseData.authToken));
                } else {
                    // Aquí puedes manejar errores específicos si lo deseas
                    console.error("Error registering:", responseData.message);
                    // Por ejemplo, podrías dispatchear una acción de error si lo necesitas
                    // dispatch(setError(responseData.message));
                }
            } catch (error) {
                console.error("Network error:", error);
                // También puedes dispatchear una acción de error en caso de error de red
                // dispatch(setError("Network error"));
            }
        };
    };

    