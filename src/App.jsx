
import { Routes, Route } from "react-router-dom";
import Login from "./components/views/Login.jsx";
import Registro from "./components/views/Registro.jsx";
import Home from "./components/views/InicioEmpresa.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/inicioempresa" element={<Home />} />
    </Routes>
  );
}

export default App;
