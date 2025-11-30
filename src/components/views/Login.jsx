import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import "../style/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); 

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

            if (rememberMe) {
                localStorage.setItem("userEmail", email);
            } else {
                localStorage.removeItem("userEmail");
            }
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
                        <h2 className="titulo">Bienvenido a Conexion</h2>
                        <p className="subtitulo">Conecta con profesionales de todas las áreas</p>
                    </div>
                    <div className="input__grupo">
                        <label className="label">Correo electrónico</label>
                        <div className="input-wrapper">
                            <svg
                            className="input-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                            </svg>
                            <input
                            type="email"
                            className="input"
                            placeholder="ingresa tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ paddingLeft: '48px' }} // aseguramos espacio para el icono
                            />
                        </div>
                        </div>

                        <div className="input__grupo">
                        <label className="label">Contraseña</label>
                        <div className="input-wrapper">
                            <svg
                            className="input-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                            </svg>
                            <input
                            type={showPassword ? 'text' : 'password'}
                            className="input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ paddingLeft: '48px', paddingRight: '48px' }} // espacio a izquierda y derecha
                            />
                            <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ zIndex: 2 }} // aseguramos que esté encima del input
                            >
                            {showPassword ? (
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                />
                                </svg>
                            ) : (
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                                </svg>
                            )}
                            </button>
                        </div>
                        </div>


                    {/* Checkbox + forgot password */}
                    <div className="remember-forgot">
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                id="remember"
                                className="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember" className="checkbox-label">Recordarme</label>
                        </div>

                        <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
                    </div>

                    <div className="formulario__iniciar sesion">
                        <button className="iniciar__sesion" type="submit">Iniciar sesión</button>
                    </div>
                    <div className="divider">o</div>
                    <div className="formulario__registro">
                        <p>¿No tienes cuenta?{" "}
                            <Link className="registro__link" to="/registro">Regístrate aquí</Link>
                        </p>
                    </div>
                </form>
            </article>

            <p className="footer">Al iniciar sesión, aceptas nuestros términos y condiciones</p>
        </section>
    );
}

export default Login;
