import { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import "../style/Registro.css";
import { Link } from "react-router-dom";
import Login from "./login";

function Register() {
    const [accountType, setAccountType] = useState("candidate"); 
    const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentPosition: "",
    yearsExperience: "",
    educationLevel: "",
    location: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    responsibleName: "",
    companyName: "",
    website: "",
    companySize: "",
    industry: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleRegister = async () => {
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
        alert("Las contraseñas no coinciden");
        setLoading(false);
        return;
    }

    if (!formData.acceptTerms) {
        alert("Debes aceptar los términos y condiciones");
        setLoading(false);
        return;
    }
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { accountType, fullName: formData.       fullName, 
        phone: formData.phone, 
        currentPosition: formData.currentPosition, 
        yearsExperience: formData.yearsExperience, 
        educationLevel: formData.educationLevel, 
        location: formData.location }, }, });
        setTimeout(() => {
        alert("¡Cuenta creada exitosamente! Revisa tu correo para confirmar.");
        setLoading(false);
        }, 1500);
    };

    return (
        <div className="registro__contenedor">
        <div className="registro__card">
            <h1 className="titulo">Registro de cuenta</h1>
            <p className="subtitulo">
            {accountType === "candidate" 
                ? "Conecta con quienes buscan tus servicios "
                : "Encuentra al profesional que necesitas"}
            </p>

            <div className="registro__subtitulo">Tipo de cuenta</div>
            <div className="tipo_de_cuenta">
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

            <div className="formulario__registro">
            <div className="formulario__grupo">
                <label className="label" required>
                {accountType === "candidate" ? "Nombre completo" : "Nombre del responsable"}
                <span className="requerido">*</span>
                </label>
                <div className="input-wrapper">
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
                <input
                    type="text"
                    name={accountType === "candidate" ? "fullName" : "responsibleName"}
                    className="input"
                    placeholder={accountType === "candidate" ? "Ej: María García López" : "Ej: Juan Pérez"}
                    value={accountType === "candidate" ? formData.fullName : formData.responsibleName}
                    onChange={handleInputChange}
                />
                </div>
            </div>

            {accountType === "employer" && (
                <div className="formulario__grupo">
                <label className="label">
                    Nombre de la empresa<span className="requerido">*</span>
                </label>
                <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                    </svg>
                    <input
                    type="text"
                    name="companyName"
                    className="input"
                    placeholder="Ej: Tech Solutions S.A."
                    value={formData.companyName}
                    onChange={handleInputChange}
                    />
                </div>
                </div>
            )}

            <div className="formulario__grupo">
                <label className="label">
                Correo electrónico<span className="requerido">*</span>
                </label>
                <div className="input-wrapper">
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
                <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder={accountType === "candidate" ? "tu.email@ejemplo.com" : "contacto@empresa.com"}
                    value={formData.email}
                    onChange={handleInputChange}
                />
                </div>
            </div>
            </div>

            <div className="formulario__registro2">
            <div className="formulario__grupo">
                <label className="label">
                Teléfono<span className="requerido">*</span>
                </label>
                <div className="input-wrapper">
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                </svg>
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

            {accountType === "candidate" ? (
                <div className="formulario__grupo">
                <label className="label">Puesto actual</label>
                <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                    </svg>
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
            ) : (
                <div className="formulario__grupo">
                <label className="label">Sitio web de la empresa</label>
                <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                    </svg>
                    <input
                    type="url"
                    name="website"
                    className="input"
                    placeholder="https://www.empresa.com"
                    value={formData.website}
                    onChange={handleInputChange}
                    />
                </div>
                </div>
            )}
            </div>

            <div className="formulario__registro2">
            {accountType === "candidate" ? (
                <>
                <div className="formulario__grupo">
                    <label className="label">Años de experiencia</label>
                    <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
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
                </div>

                <div className="formulario__grupo">
                    <label className="label">Nivel educativo</label>
                    <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                    </svg>
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
                </>
            ) : (
                <>
                    <div className="formulario__grupo">
                    <label className="label">Tamaño de la empresa</label>
                    <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <select
                        name="companySize"
                        className="select"
                        value={formData.companySize}
                        onChange={handleInputChange}
                    >
                        <option value="">Seleccionar</option>
                        <option value="1-10">1-10 empleados</option>
                        <option value="11-50">11-50 empleados</option>
                        <option value="51-200">51-200 empleados</option>
                        <option value="201-500">201-500 empleados</option>
                        <option value="500+">Más de 500 empleados</option>
                    </select>
                    </div>
                </div>
                <div className="formulario__grupo">
                <label className="label">Sector / Industria</label>
                <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                    </svg>
                    <select 
                        name="industria"
                        className="select"
                        value={formData.industry}
                        onChange={handleInputChange}>
                            <option value="">Seleccionar</option>
                            <option value="tecnologia">Tecnologia e IT</option>
                            <option value="finanzas">Finanzas y Banca</option>
                            <option value="salud">Salud y farmaceutica</option>
                            <option value="educacion">Educacion</option>
                            <option value="comercio">Retail y Comercio</option>
                            <option value="Manufactura">Manufactura</option>
                            <option value="Turismo">Hospitalidad y Turismo</option>
                            <option value="construccion">Construcción</option>
                            <option value="publicidad">Marketing y Publicidad</option>
                            <option value="otro">Otro</option>
                        </select>
                </div>
                </div>

                </>
            )}
            </div>

            {accountType === "candidate" ? (
            <div className="formulario__registro">
                <div className="formulario__grupo">
                <label className="label">Ubicación</label>
                <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    </svg>
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
            </div>
            ) : (
            <div className="form-grid">
                
            </div>
            )}

            <div className="formulario__registro2">
            <div className="formulario__grupo">
                <label className="label">
                Contraseña<span className="requerido">*</span>
                </label>
                <div className="input-wrapper">
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
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

            <div className="formulario__grupo">
                <label className="label">
                Confirmar contraseña<span className="requerido">*</span>
                </label>
                <div className="input-wrapper">
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
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
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? (
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

            <button className="submit-btn" onClick={handleRegister} disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear mi cuenta"}
            </button>
            <div className="divider">o</div>
            <div className="formulario__login">
                <p>¿Ya tienes cuenta?
                    <Link className="login" to="/ ">inicia sesion aquí</Link>
                </p>
            </div>
        </div>
        </div>
    );
}

export default Register;