import { supabase } from "../config/supabaseClient";

export const obtenerOfertas = async () => {
  const { data, error } = await supabase
    .from('ofertas')
    .select('*')
    .order('fecha_de_publicacion', { ascending: false });
  
  if (error) throw error;
  return data;
};