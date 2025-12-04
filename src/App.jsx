
import { Routes, Route } from "react-router-dom";
import Login from "./components/views/Login.jsx";
import Registro from "./components/views/Registro.jsx";
import Home from "./components/views/InicioEmpresa.jsx"
import Perfil from "./components/views/Perfil.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/inicioempresa" element={<Home />} />
      <Route path="/perfil" element={<Perfil/>}/>
    </Routes>
  );
}

export default App;
