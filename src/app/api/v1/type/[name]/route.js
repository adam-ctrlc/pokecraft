import { NextResponse } from "next/server";
import { POKEAPI_BASE } from "@/config/pokeapi";

export async function GET(request, { params }) {
  const { name } = await params;

  try {
    const res = await fetch(`${POKEAPI_BASE}/type/${name}`, {
      cache: "force-cache",
    });
    if (!res.ok) throw new Error();
    return NextResponse.json(await res.json());
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch type ${name}` }, { status: 500 });
  }
}
