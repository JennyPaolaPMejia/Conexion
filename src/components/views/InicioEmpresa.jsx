import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { supabase } from "../../config/supabaseClient"; 
import { obtenerOfertas } from "../../services/ofertasServices";
import "../style/Inicio_empresa.css";

const JobPlatform = () => {
  const navigate = useNavigate(); 
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/"); 
      } else {
        cargarOfertas();
      }
    };

    const cargarOfertas = async () => {
      try {
        const data = await obtenerOfertas();
        setOfertas(data);
      } catch (error) {
        console.error("Error al cargar ofertas:", error);
      } finally {
        setCargando(false);
      }
    };

    verificarSesion();
  }, [navigate]); 

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error);
    } else {
      navigate("/");
    }
  };

  const notifications = [
    { id: 1, text: 'Nueva oferta en Tecnología', time: 'Hace 1 hora' },
    { id: 2, text: 'Tu perfil ha sido visto', time: 'Hace 3 horas' }
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{
        backgroundColor: 'white',
        padding: '16px 40px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="40" height="40" viewBox="0 0 40 40" style={{ marginRight: '8px' }}>
            <circle cx="20" cy="20" r="18" fill="none" stroke="#0066FF" strokeWidth="2" />
            <path d="M 12 20 Q 20 10, 28 20 Q 20 30, 12 20" fill="#FF1493" opacity="0.7" />
          </svg>
          <h1 style={{
            fontSize: '28px',
            margin: 0,
            background: 'linear-gradient(90deg, #0066FF, #FF1493)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            CONEXIÓN
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#0066FF',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Publicar Oferta
          </button>

          <button style={{
            padding: '10px 20px',
            backgroundColor: 'white',
            color: '#0066FF',
            border: '2px solid #0066FF',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Ver Ofertas Publicadas
          </button>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C7.8 2 6 3.8 6 6V9L4 11V13H16V11L14 9V6C14 3.8 12.2 2 10 2Z" fill="#333" />
                <path d="M10 18C11.1 18 12 17.1 12 16H8C8 17.1 8.9 18 10 18Z" fill="#333" />
              </svg>
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#FF1493',
                borderRadius: '50%'
              }}></span>
            </button>

            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                width: '280px',
                zIndex: 1000
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>
                  <strong>Notificaciones</strong>
                </div>
                {notifications.map(notif => (
                  <div key={notif.id} style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer'
                  }}>
                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>{notif.text}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{notif.time}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#0066FF',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              U
            </button>

            {showProfileMenu && (
              <div style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                width: '200px',
                zIndex: 1000
              }}>
                <button style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  borderBottom: '1px solid #eee'
                }}>
                  Ver Perfil
                </button>
                <button style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  borderBottom: '1px solid #eee'
                }}>
                  Configuración
                </button>
                <button 
                  onClick={handleLogout} 
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#FF1493',
                    fontWeight: '500'
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div style={{
        backgroundColor: '#0066FF',
        color: 'white',
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '36px', marginBottom: '16px', fontWeight: '600' }}>
          Encuentra la persona idónea para el trabajo
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
          Miles de opciones esperándote
        </p>

        <div style={{
          display: 'flex',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ flex: 1, padding: '16px', borderRight: '1px solid #eee' }}>
            <input
              type="text"
              placeholder="Título del trabajo, palabras clave..."
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: '#333'
              }}
            />
          </div>
          <div style={{ flex: 1, padding: '16px', borderRight: '1px solid #eee' }}>
            <input
              type="text"
              placeholder="Ciudad, provincia o remoto"
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: '#333'
              }}
            />
          </div>
          <button style={{
            padding: '16px 40px',
            backgroundColor: '#0066FF',
            color: 'white',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Buscar
          </button>
        </div>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '40px auto',
        padding: '0 40px',
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '32px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          height: 'fit-content',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>Filtros</h3>

          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>Tipo de empleo</h4>
            {['Tiempo completo', 'Media jornada', 'Freelance', 'Prácticas'].map(type => (
              <label key={type} style={{ display: 'block', marginBottom: '8px', fontSize: '14px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                {type}
              </label>
            ))}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>Categoría</h4>
            {['Tecnología', 'Diseño', 'Marketing', 'Producto', 'Ventas'].map(cat => (
              <label key={cat} style={{ display: 'block', marginBottom: '8px', fontSize: '14px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '20px' }}>
            {ofertas.length} empleos encontrados
          </h3>

          {cargando ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Cargando ofertas...</p>
          ) : ofertas.length === 0 ? (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#666' }}>No hay ofertas disponibles en este momento.</h3>
            </div>
          ) : (
            ofertas.map(oferta => (
              <div key={oferta.identificacion} style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '20px', marginTop: 0, marginBottom: '8px', color: '#333' }}>
                      {oferta.titulo}
                    </h3>
                    <p style={{ fontSize: '16px', color: '#666', marginBottom: '12px' }}>
                      {oferta.empresa}
                    </p>

                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '16px',
                      flexWrap: 'wrap'
                    }}>
                      <span>📍 {oferta.direccion}</span>
                      <span>💼 {oferta.jornada}</span>
                      <span>🕒 {new Date(oferta.fecha_de_publicacion).toLocaleDateString()}</span>
                    </div>

                    <p style={{ fontSize: '14px', color: '#333', lineHeight: '1.6', marginBottom: '16px' }}>
                      {oferta.descripcion}
                    </p>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {oferta.etiquetas && oferta.etiquetas.split(',').map((tag, index) => (
                        <span key={index} style={{
                          padding: '6px 12px',
                          backgroundColor: '#E6F0FF',
                          color: '#0066FF',
                          borderRadius: '4px',
                          fontSize: '13px'
                        }}>
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginLeft: '24px' }}>
                    <button style={{
                      width: '32px',
                      height: '32px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      fontSize: '20px'
                    }}>
                      🔖
                    </button>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#0066FF',
                      marginTop: '40px'
                    }}>
                      {oferta.sueldo}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPlatform;