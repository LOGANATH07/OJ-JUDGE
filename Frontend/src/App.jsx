import { useState } from 'react';
import './App.css'
import { Login } from './Login/Login'
import { Register } from './Register/Register'

function App() {
  const [loginOrRegister, setLoginOrRegister] = useState(true);

  return (
    <>
        { loginOrRegister && <Login isLoginOrRegister={setLoginOrRegister} />}
        { !loginOrRegister && <Register isLoginOrRegister={setLoginOrRegister} />}
    </>
  )
}

export default App
