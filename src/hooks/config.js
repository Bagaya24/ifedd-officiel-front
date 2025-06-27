// config.js
export const API_BASE = "https://api.officiel.ifedd-rdc.org";

export async function safeFetch(url) {
  try{
    const res = await fetch(url, {
      method: "GET"}
    );
    if (!res.ok) throw new Response("Erreur serveur ", { status: 500 });
    return res.json();
  }
  catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error; // Propagate the error to be handled by the caller
  }
}

