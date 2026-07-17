import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request) {
  try {
    const params = request.nextUrl.searchParams;
    const token = params.get("token");
    if (!token || token !== process.env.AUTOMATION_TOKEN) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    return NextResponse.json({ paso: "inicio ok" });
  } catch (e) {
    return NextResponse.json(
      { step: "catch", error: String(e && e.message ? e.message : e) },
      { status: 500 }
    );
  }
}
