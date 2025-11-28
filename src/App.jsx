
import { Routes, Route } from "react-router-dom";
import Login from "./components/views/login.jsx";
import Registro from "./components/views/Registro.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  );
}

export default App;
