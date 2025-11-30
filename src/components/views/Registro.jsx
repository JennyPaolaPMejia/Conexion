import { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import "../style/Registro.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [accountType, setAccountType] = useState(null); 

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    accountType: accountType, 
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
                                <div
                                    className={`account-type-card ${
                                        accountType === "candidate" ? "active" : ""
                                    }`}
                                    onClick={() => setAccountType("candidate")}
                                >
                                    <div className="cuenta__logo">
                                        <svg
                                            width="24"
                                            height="24"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
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
                            <div className={`account-type-card ${accountType === "employer" ? "active" : ""}`}
                                onClick={() => setAccountType("employer")} >
                                <div className="cuenta_logo">
                                    <svg 
                                        width="24" 
                                        height="24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24">
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
                        <div className="formulario_registro">

                            {/* Email */}
                            <div className="input__email">
                                <label htmlFor="email" className="label">Email:</label>
                                <div className="input-wrapper">

                                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>

                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                </div>
                            </div>

                            {/* Contraseña */}
                            <div className="input__contraseña" >
                                <label htmlFor="password" className="label">Contraseña:</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <input
                                    className="input"
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                
                            </div>
                        </div>
                        <div >
                            <button className="registrar__cuenta" type="submit" disabled={loading} >
                            {loading ? "Cargando..." : "Crear cuenta"}
                            </button>
                        </div>
                    </form>
                </article>
            </main>
        </section>
    );
}

export default Register;
