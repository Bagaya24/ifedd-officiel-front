// config.js
export const API_BASE = "http://127.0.0.1:8000";

export async function safeFetch(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Response("Erreur serveur", { status: 500 });
  return res.json();
}
