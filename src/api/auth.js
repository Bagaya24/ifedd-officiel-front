import { api } from '../api/Api';


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
};

export const verifyToken = async () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (!token) return { isConnected: false, username: '' };

    try {

        const response = await api.get(`connexion/verify-token/${token}`);
        if (!response.status === 200) throw new Error('Token invalid');
        return { isConnected: true, username };
    } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        return { isConnected: false, username: '' };
    }
};

