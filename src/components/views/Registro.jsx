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
                </article>
            </main>
        </section>
    );
}

export default Register;
