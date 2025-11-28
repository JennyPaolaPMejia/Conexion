import { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import "../style/Registro.css"

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
        email,
        password,
        });

        setLoading(false);

        if (error) {
        alert(error.message);
        } else {
        alert("Revisa tu correo para confirmar tu cuenta");
        }
    };

    return (
        <form onSubmit={handleRegister}>
        <h2>Registro</h2>
        <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input 
            type="password" 
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Crear cuenta"}
        </button>
        </form>
    );
    }

    export default Register;
