import { NextResponse } from "next/server";
import { isCorrectPassword, expectedSessionToken, SESSION_COOKIE } from "@/lib/session";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const password = body?.password || "";

  if (!isCorrectPassword(password)) {
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, expectedSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 días
  });
  return response;
}
