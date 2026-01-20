import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('token'); // Clear the token from local storage
        localStorage.removeItem('username'); // Clear the username from local storage
        navigate('/'); // Redirect to the login page
    }, [navigate])
    return (
        <div>

        </div>
    )
}