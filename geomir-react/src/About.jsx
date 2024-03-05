import { useContext } from "react";
import { UserContext } from "./userContext";


export default function AboutUs() {
    let { authToken } = useContext(UserContext);

    
    return (
      <>
        <div> 
          <p>HOLA, persona que esta miradno este triste proyecto</p>
          <br />
          <br />
          <p>Aqui teoricamente va la parte de about us:</p>
          <p>about us solo puedo decir que lo veo muy negro</p>
          <p>Animos Izan</p>
        </div>
        <hr />
      </>
    );
  }