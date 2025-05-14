import { TYPE_TRANSLATIONS } from "@/lib/types";
import { NextResponse } from "next/server";

const FIELDS = [
  "name",
  "formatted_address",
  "types",
  "photos",
  "editorial_summary",
].join(",");

export async function GET(
  _req: Request,
  context: { params: Promise<{ placeId: string }> }
) {
  const { placeId } = await context.params;
  const key = process.env.GOOGLE_PLACES_API_KEY!;
  const base = "https://maps.googleapis.com/maps/api/place/details/json";
  const url = new URL(base);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("key", key);
  url.searchParams.set("language", "he");
  const res = await fetch(url.toString());
  const data = await res.json();

  let imageUrl: string | null = null;
  if (data.result.photos?.length) {
    const photoRef = data.result.photos[0].photo_reference;
    const pUrl = new URL("https://maps.googleapis.com/maps/api/place/photo");
    pUrl.searchParams.set("maxwidth", "1000");
    pUrl.searchParams.set("photoreference", photoRef);
    pUrl.searchParams.set("key", key);

    const photoRes = await fetch(pUrl.toString(), { redirect: "follow" });
    imageUrl = photoRes.url;
  }

  const hebrewTypes = (data.result.types as string[]).map(
    (t) => TYPE_TRANSLATIONS[t] ?? t
  );

  const payload = {
    name: data.result.name,
    address: data.result.formatted_address,
    types: hebrewTypes,
    image: imageUrl,
    description: data.result.editorial_summary?.overview ?? null,
  };

  return NextResponse.json(payload);
}
