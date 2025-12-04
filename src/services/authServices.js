import { supabase } from "../config/supabaseClient"

export const registrarUsuarioAuth = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) throw error
  return data
}

export const crearPerfilUsuario = async (datosUsuario) => {
  const { error } = await supabase.from("usuarios").insert([datosUsuario])
  if (error) throw error
}

export const crearPerfilEmpresa = async (datosEmpresa) => {
  const { error } = await supabase.from("empresas").insert([datosEmpresa])
  if (error) throw error
}

export const orquestarRegistro = async (tipoCuenta, datosFormulario, transformaciones) => {
  const { user } = await registrarUsuarioAuth(datosFormulario.email, datosFormulario.password)
  
  if (!user) throw new Error("Error al crear usuario en Auth")

  const baseUsuario = {
    id: user.id,
    nombre_completo: tipoCuenta === "candidate" ? datosFormulario.fullName : datosFormulario.responsibleName,
    correo_electronico: datosFormulario.email,
    telefono: datosFormulario.phone,
    profesion: tipoCuenta === "candidate" ? datosFormulario.currentPosition : null,
    experiencia: tipoCuenta === "candidate" ? transformaciones.experiencia(datosFormulario.yearsExperience) : null,
    direccion: tipoCuenta === "candidate" ? datosFormulario.location : null,
    tipo_de_usuario: tipoCuenta === "candidate" ? "candidato" : "empresa"
  }

  await crearPerfilUsuario(baseUsuario)

  if (tipoCuenta === "employer") {
    const baseEmpresa = {
      id: user.id,
      nombre_empresa: datosFormulario.companyName,
      correo_electronico: datosFormulario.email,
      telefono: datosFormulario.phone,
      sitio_web: datosFormulario.website,
      tamaño: transformaciones.tamanoEmpresa(datosFormulario.companySize),
      industria: datosFormulario.industry
    }
    await crearPerfilEmpresa(baseEmpresa)
  }


  return user
}

export const iniciarSesionUsuario = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export const obtenerDatosUsuario = async (id) => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("tipo_de_usuario")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}