import React from 'react'
import '../style/Perfil.css'


const Perfil = () => {







    
  
  return (
    <div className="perfil-contenedor">

        {/* Bloque 1: Información Principal y Contacto */}
        <section className="info-principal">
            <div className="datos-contacto">
                {/* Las etiquetas 'img' deben cerrarse en JSX */}
                <img src="URL_DE_LA_FOTO_DE_PERFIL" alt="Foto de Perfil" className="foto-perfil" />
                <h1>Ana María Rodríguez</h1>
                <p className="titulo">Arquitecta Senior & Directora de Proyectos</p>
                <p className="detalles">Certificada / 12+ años experiencia</p>
                <p className="contacto">Madrid, 66 991 123 456</p>
                <p className="contacto">ana.rodriguez@email.com</p>
                <a href="#">ana.rodriguez.com</a>
            </div>
            <div className="acciones">
                <button className="btn-editar">Editar Perfil</button>
                <button className="btn-contactar">Contactar</button>
            </div>
        </section>
        
        {/* Bloque 2: Educación Superior / Trayectoria */}
        <section className="bloque-educacion">
            <h2>Educación</h2>
            <div className="item-educacion">
                <h3>Arquitecta Rooderational Institute</h3>
                <p>Asociada</p>
                <ul>
                    <li>Diplomas y cursos extra</li>
                    <li>Especialización en Project.com</li>
                </ul>
            </div>
            <div className="item-educacion">
                {/* Las etiquetas 'img' deben cerrarse en JSX */}
                <img src="URL_FOTO_MASTER" alt="Foto Master" className="foto-master" />
                <h3>Máster en Gestión de Madrid</h3>
                <p>Arquitectura Urbanística</p>
                <p>2012</p>
            </div>
            <div className="acciones-bloque">
                 <button className="btn-editar">Editar Perfil</button>
                 <button className="btn-contactar">Contactar</button>
            </div>
        </section>

        {/* Bloque 3: Resumen Profesional y Áreas de Experiencia */}
        <div className="resumen-experiencia">
            <section className="bloque-resumen">
                <h2>Resumen Profesional</h2>
                <p>Arquitecta senior con más de 12 años de experiencia. Especializada en la gestión de proyectos complejos.</p>
            </section>
            
            <section className="bloque-areas">
                <h2>Áreas de Especialización</h2>
                <p>Área con exposición de más de 100 inmuebles. Gran experiencia en proyectos residenciales y comerciales.</p>
            </section>
        </div>

        {/* Bloque 4: Habilidades Técnicas y Diseño */}
        <div className="habilidades-diseño">
            <section className="bloque-habilidades">
                <h2>Áreas de Expectativas</h2>
                <p>Autocad / Básico</p>
                <p>Diseño</p>
                <ul>
                    <li>Certificados 3D</li>
                    <li>Modelado 3D</li>
                </ul>
                <button>Ver 8 habilidades</button>
            </section>
            
            <section className="bloque-diseño">
                <h2>Diseño de Creatividad</h2>
                <ul>
                    <li>Arquitectura LEED</li>
                    <li>Diseño Sustentable</li>
                    <li>Básicos - 3 items</li>
                    <li>Certificación LEED</li>
                    <li>Visualizado 3D</li>
                    <li>Modelado 3D</li>
                </ul>
                <div className="tags">
                    <span>Innovación</span>
                    <span>Transacción</span>
                    <span>...</span>
                </div>
            </section>
        </div>

        {/* Bloque 5: Portafolio de Proyectos */}
        <section className="portafolio">
            <h2>Portafolio de Proyectos</h2>
            
            {/* Item de Portafolio */}
            <div className="proyecto-item">
                <img src="URL_IMAGEN_PROYECTO_1" alt="Imagen del proyecto complejo residencial" className="img-proyecto" />
                <div className="detalle-proyecto">
                    <p className="fecha">2023</p>
                    <h3>Complejo Residencial Vista Mar</h3>
                    <p>Diseño y dirección de complejo de 132 unidades con certificación LEED Gold.</p>
                    <div className="tags-proyecto">
                        <span>LEED Gold</span>
                        <span>BIM</span>
                        <span>Residencial</span>
                    </div>
                </div>
            </div>
            
            {/* Item de Portafolio 2 (Ejemplo con otra imagen) */}
            <div className="proyecto-item">
                <img src="URL_IMAGEN_PROYECTO_2" alt="Imagen de torre corporativa" className="img-proyecto" />
                <div className="detalle-proyecto">
                    <p className="fecha">2023</p>
                    <h3>Torre Corporativa Innova</h3>
                    <p>Proyecto y edificación de 3 niveles de plazas comerciales. Lorem ipsum...</p>
                    <div className="tags-proyecto">
                        <span>Label</span>
                        <span>BIM</span>
                        <span>General</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Bloque 6: Certificaciones y Reseñas */}
        <div className="certificaciones-reseñas">
             <section className="certificaciones">
                <h2>Certificaciones</h2>
                {/* Opciones de filtro */}
                <div className="tabs">
                    <button className="tab-activo">Todos</button>
                    <button>Residencial</button>
                    <button>Comercial</button>
                    {/* ... otros filtros */}
                </div>

                {/* Gráfico de Habilidades (Representado con barra) */}
                <div className="skill-bar">
                    <p>Skill Técnica 1</p>
                    {/* Estilo en línea de ejemplo para la barra. En realidad, se usaría CSS */}
                    <div className="barra-progreso"><div style={{ width: '80%' }}></div></div>
                    <span>80%</span>
                </div>
                
                {/* ... otras barras de skill ... */}

                {/* Listado de Certificados */}
                <div className="lista-certificados">
                    <div className="certificado-item">
                        <p className="fecha">2023</p>
                        <h3>Formación 10hr de Construcción</h3>
                        <p>Descripción del curso y lo que incluye.</p>
                        <div className="tags-certificado">
                            <span>Comercial</span>
                            <span>BIM</span>
                            <span>Sustentable</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reseñas */}
            <section className="reseñas">
                <h2>Reseñas</h2>
                {/* Reseña de un cliente o empresa */}
                <div className="reseña-item">
                    <div className="info-cliente">
                        <p className="nombre-cliente">Carlos Martínez</p>
                        <p className="cargo-cliente">Director General | Constructora Maiz</p>
                    </div>
                    <div className="estrellas">
                        {/* Se usa una Entidad HTML Unicode para la estrella */}
                        <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span> 
                    </div>
                    <p className="texto-reseña">"Un gran talento. Ha superado nuestras expectativas en el proyecto. Lo recomiendo ampliamente."</p>
                </div>
            </section>
        </div>
        
    </div>
  );
};

export default Perfil;