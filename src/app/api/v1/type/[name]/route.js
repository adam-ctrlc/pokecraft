import { NextResponse } from "next/server";
import axios from "axios";
import { POKEAPI_BASE } from "../../../config";

export async function GET(request, { params }) {
  const { name } = await params;

  try {
    const response = await axios.get(`${POKEAPI_BASE}/type/${name}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch type ${name}` },
      { status: 500 }
    );
  }
}
