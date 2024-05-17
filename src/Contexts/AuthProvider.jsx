import React, { createContext } from 'react'
import API_ENDPOINT from "../utils/constants";

export const AuthContext = createContext();
function AuthProvider( {children}) {
  const handleLogout = async (location) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage

    try {
      const response = await fetch(`${API_ENDPOINT}/api/user/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {

        localStorage.removeItem('authToken'); 
        console.log('Logout successful');
        window.location.href=location
      } else {
        console.error('Logout failed:', response.statusText);
      }
    
    } catch (error) {
      console.error('An error occurred during logout:', error.message);
    }
  };
  const handleLogoutClick = async () => {
    try {
      await handleLogout('/'); // Redirect to '/' after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider
    value={{handleLogout,handleLogoutClick}}
  >
    {children}
  </AuthContext.Provider>
  )
}

export default AuthProvider