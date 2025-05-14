import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");
  if (!input) {
    return NextResponse.json({ predictions: [] });
  }
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&language=iw&key=${key}`
  );
  const data = await res.json();
  return NextResponse.json(data);
}
