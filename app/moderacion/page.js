import { cookies } from "next/headers";
import { hasValidSession, SESSION_COOKIE } from "@/lib/session";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import StarsBackground from "../components/StarsBackground";

export default async function Moderacion() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE)?.value;
  const autenticado = hasValidSession(cookie);

  return (
    <div className="page-shell">
      <StarsBackground />
      <div className="page-eyebrow">CARTAS PARA VENEZUELA</div>
      <div className="page-title">Panel de moderación</div>
      {autenticado ? <Dashboard /> : <LoginForm />}
    </div>
  );
}
