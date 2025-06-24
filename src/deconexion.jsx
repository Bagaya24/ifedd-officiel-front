import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

export default function Deconexion() {
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
