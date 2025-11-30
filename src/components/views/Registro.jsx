import { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import "../style/Registro.css";
import { Link } from "react-router-dom";
import Login from "./login";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [accountType, setAccountType] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        currentPosition: "",
        yearsExperience: "",
        educationLevel: "",
        location: "",
        password: "",
        confirmPassword: ""
    });

    // Manejar inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    accountType,
                    fullName: formData.fullName,
                    phone: formData.phone,
                    currentPosition: formData.currentPosition,
                    yearsExperience: formData.yearsExperience,
                    educationLevel: formData.educationLevel,
                    location: formData.location
                },
            },
        });

        setLoading(false);

        if (error) {
            alert(error.message);
        } else {
            alert("Revisa tu correo para confirmar tu cuenta");
        }
    };

    return (
        <section className="registro__contenedor">
            <main>
                <article className="registro__card">
                    <h2 className="titulo">Registro de cuenta</h2>
                    <p className="subtitulo">Encuentra quien busca tus servicios</p>

                    <form onSubmit={handleRegister}>
                        
                        <div className="registro__subtitulo">Tipo de cuenta</div>

                        <div className="tipo_de_cuenta">

                            {/* Candidato */}
                            <div
                                className={`account-type-card ${accountType === "candidate" ? "active" : ""}`}
                                onClick={() => setAccountType("candidate")}
                            >
                                <div className="cuenta__logo">
                                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <div className="cuenta__titulo">Candidato</div>
                                <div className="cuenta__subtitulo">Busco empleo</div>
                            </div>

                            {/* Empleador */}
                            <div
                                className={`account-type-card ${accountType === "employer" ? "active" : ""}`}
                                onClick={() => setAccountType("employer")}
                            >
                                <div className="cuenta__logo">
                                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <div className="cuenta__titulo">Empleador</div>
                                <div className="cuenta__subtitulo">Busco talento</div>
                            </div>
                        </div>

                        {/* NOMBRE COMPLETO */}
                        <div className="formulario_registro">
                            <div className="formulario__grupo">
                                <label className="label">
                                    Nombre completo <span className="requerido">*</span>
                                </label>

                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="input"
                                        placeholder="Ej: María García López"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="formulario__grupo">
                                <label className="label">
                                    Correo electrónico <span className="requerido">*</span>
                                </label>

                                <div className="input-wrapper">
                                    <input
                                        className="input"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* TELÉFONO + PUESTO */}
                        <div className="formulario__registro2">
                            <div className="formulario__grupo">
                                <label className="label">Teléfono</label>

                                <div className="input-wrapper">
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="input"
                                        placeholder="+34 600 000 000"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="formulario__grupo">
                                <label className="label">Puesto actual</label>

                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        name="currentPosition"
                                        className="input"
                                        placeholder="Ej: Desarrollador Full Stack"
                                        value={formData.currentPosition}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* EXPERIENCIA + EDUCACIÓN */}
                        <div className="formulario__registro2">
                            <div className="formulario__grupo">
                                <label className="label">Años de experiencia</label>
                                <select
                                    name="yearsExperience"
                                    className="select"
                                    value={formData.yearsExperience}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="0-1">Menos de 1 año</option>
                                    <option value="1-3">1-3 años</option>
                                    <option value="3-5">3-5 años</option>
                                    <option value="5-10">5-10 años</option>
                                    <option value="10+">Más de 10 años</option>
                                </select>
                            </div>

                            <div className="formulario__grupo">
                                <label className="label">Nivel educativo</label>
                                <select
                                    name="educationLevel"
                                    className="select"
                                    value={formData.educationLevel}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="secundaria">Secundaria</option>
                                    <option value="tecnico">Técnico</option>
                                    <option value="universitario">Universitario</option>
                                    <option value="posgrado">Posgrado</option>
                                    <option value="doctorado">Doctorado</option>
                                </select>
                            </div>
                        </div>

                        {/* UBICACIÓN */}
                        <div className="formulario__grupo">
                            <label className="label">Ubicación</label>

                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="location"
                                    className="input"
                                    placeholder="Ej: Madrid, España"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* CONTRASEÑA + CONFIRMACIÓN */}
                        <div className="formulario__registro2">

                            {/* CONTRASEÑA */}
                            <div className="formulario__grupo">
                                <label className="label">Contraseña <span className="requerido">*</span></label>

                                <div className="input-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="input"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setFormData(prev => ({ ...prev, password: e.target.value }));
                                        }}
                                    />

                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            // OJO CERRADO
                                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59" />
                                            </svg>
                                        ) : (
                                            // OJO ABIERTO
                                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* CONFIRMAR CONTRASEÑA */}
                            <div className="formulario__grupo">
                                <label className="label">Confirmar contraseña <span className="requerido">*</span></label>

                                <div className="input-wrapper">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        className="input"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="toggle-password"
                                    >
                                        {showConfirmPassword ? (
                                            // ojo cerrado
                                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L6.59 6.59m7.532 7.532l3.29 3.29" />
                                            </svg>
                                        ) : (
                                            // ojo abierto
                                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="terms-box">
                            <div className="checkbox-wrapper">
                                <input
                                type="checkbox"
                                id="terms"
                                name="acceptTerms"
                                className="checkbox"
                                checked={formData.acceptTerms}
                                onChange={handleInputChange}
                                />
                                <label htmlFor="terms" className="terms-text">
                                Acepto los{" "}
                                <a href="#" className="terms-link">
                                    términos y condiciones
                                </a>{" "}
                                y la{" "}
                                <a href="#" className="terms-link">
                                    política de privacidad
                                </a>{" "}
                                de Conexión. Entiendo que mis datos serán tratados de acuerdo con la normativa de
                                protección de datos.
                                </label>
                            </div>
                            </div>
                        {/* BOTÓN */}
                        <button className="registrar__cuenta" type="submit" disabled={loading}>
                            {loading ? "Cargando..." : "Crear cuenta"}
                        </button>
                    </form>
                    <div className="divider">o</div>
                    <div className="formulario__login">
                        <p>¿Ya tienes cuenta? {""}
                            <Link className="login" to="/">Inicia sesión aquí</Link>
                        </p>
                    </div>
                </article>
            </main>
        </section>
    );
}

export default Register;
