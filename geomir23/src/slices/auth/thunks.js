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
    