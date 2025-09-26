import { urlbase } from "../api/Api";

// src/services/authService.js
export const validateLoginForm = (username, password, setError) => {
  if (!username || !password) {
    setError("Le nom d'utilisateur et le mot de passe sont requis.");
    return false;
  }
  setError("");
  return true;
};

export const loginUser = async (username, password) => {
  const formDetails = new URLSearchParams();
  formDetails.append("username", username);
  formDetails.append("password", password);

  try {
    const response = await fetch(`${urlbase}/connexion/token` , {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formDetails
    });
    console.log(response)

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.detail || "Échec de la connexion." };
    }

    const data = await response.json();
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("username", data.user);
    return { success: true };
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Erreur lors de la tentative de connexion. Réessayez plus tard."
    };
  }
};
