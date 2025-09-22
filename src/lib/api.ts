import type { LastFmResponse } from "@/types/lastfm";

const LAST_FM_API_KEY = process.env.NEXT_PUBLIC_LAST_FM_API_KEY;
const LAST_FM_BASE_URL =
  process.env.NEXT_PUBLIC_LAST_FM_BASE_URL ||
  "https://ws.audioscrobbler.com/2.0/";
const USERNAME = "vyzss";

export async function fetchLastFmData(): Promise<LastFmResponse> {
  if (!LAST_FM_API_KEY) {
    throw new Error("LAST_FM_API_KEY environment variable is not set");
  }

  const params = new URLSearchParams({
    method: "user.getrecenttracks",
    user: USERNAME,
    api_key: LAST_FM_API_KEY,
    format: "json",
    limit: "10",
  });

  const response = await fetch(`${LAST_FM_BASE_URL}?${params}`, {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
