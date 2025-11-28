import { useState } from "react";
import { Link } from "react-router-dom";   // 👈 Importante
import { supabase } from "../../config/supabaseClient";
import "../style/Login.css"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        });

        if (error) {
        alert(error.message);
        } else {
        alert("Sesión iniciada");
        console.log("usuario:", data.user);
        }
    };

    return (
        <section className="formulario__contenedor">
            <article className="contenedor__articulo">
                <form className="articulo__formulario" onSubmit={handleLogin}>
                    <div className="formulario__logo">
                        <img src="/Logo-Conexion.png" alt="Logo conexion" />
                    </div>
                    <div className="formulario__presentacion">
                        <h2>Bienvenido a Conexion</h2>
                        <p>Conecta con profesionales de todas las áreas</p>
                    </div>
                    <div className="formulario__inputs">
                        <div className="input__email">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input__contraseña">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="formulario__iniciar sesion">
                        <button type="submit">Iniciar sesion</button>
                    </div>
                    <div className="formulario__registro">
                        <p>
                            ¿No tienes cuenta?{" "}
                            <Link to="/registro">Regístrate aquí</Link>
                        </p>
                    </div>
                </form>
            </article>
            <p>Al iniciar sesión, aceptas nuestros términos y condiciones</p>
        </section>
        
    );
    }

export default Login;

