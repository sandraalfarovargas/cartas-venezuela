import { createClient } from "@supabase/supabase-js";

// Este cliente SOLO se usa en el servidor (rutas /api/...).
// Usa la "service role key", que tiene acceso completo a la base de datos,
// por eso nunca debe usarse en el navegador.
let client = null;

export function getSupabaseAdmin() {
  if (!client) {
    client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );
  }
  return client;
}
