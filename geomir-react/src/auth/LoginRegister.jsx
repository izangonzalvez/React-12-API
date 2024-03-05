import Login from "./Login";
import Register from "./Register";
import { useState } from 'react'

export default function LoginRegister() {
    let [login, setLogin] = useState(true);
  return (
    <>
      {login ? <Login setCanvi={setLogin} /> : <Register setCanvi={setLogin}/>}
    </>
  );
}
