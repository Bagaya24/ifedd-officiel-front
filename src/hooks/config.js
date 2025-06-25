// config.js
export const API_BASE = "https://api.officiel.ifedd-rdc.org";

export async function safeFetch(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Response("Erreur serveur", { status: 500 });
  return res.json();
}
