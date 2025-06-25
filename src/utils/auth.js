import { API_BASE } from '../hooks/config';

export const verifyToken = async () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  
  if (!token) return { isConnected: false, username: '' };

  try {
    const response = await fetch(`${API_BASE}/connexion/verify-token/${token}`);
    if (!response.ok) throw new Error('Token invalid');
    return { isConnected: true, username };
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return { isConnected: false, username: '' };
  }
};
