import { api, urlbase } from "../api/Api";

export const loginUser = async (username, password) => {
    const formDetails = new URLSearchParams();
    formDetails.append("username", username);
    formDetails.append("password", password);

    try {
        const response = await fetch(`${urlbase}/connexion/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formDetails
        });

        if (response.status === 200) {
            // Stocker le token et le username dans localStorage
            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('username', username);

            return {
                success: true,
                message: data.message,
                token: data.access_token
            };
        } else {
            return {
                success: false,
                message: 'Erreur de connexion'
            };
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: 'Identifiants incorrects'
        };
    }
};
