import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const userContext = createContext();//allowing the app to share authentication state (like user, login, logout) across multiple components 

// allowing the app to share authentication state (like user, login, logout) across multiple components without needing to pass props down through each component.
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);//user: Stores the currently authenticated user's data or null if no user is authenticated.

  const [loading, setLoading] = useState(true);//loading: Indicates whether the app is currently checking if the user is authenticated.


  useEffect(() => {//4. useEffect: Verifying Authentication on Initial Load


    //This useEffect runs once on component mount. It checks if there's an authentication token in localStorage.
    //If a token is found, it makes a request to the backend (/api/auth/verify) to confirm the token's validity.
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');/*Retrieves the token from localStorage.*/
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/verify', {//sends this request to verify if the token is still valis 
            headers: {
              Authorization: `Bearer ${token}`,//the toiken is passed in authorizatuon
            },
          });

          console.log(response);
          if (response.data.success) {
            setUser(response.data.user);//If valid, it sets user with the returned user data.
          } else {
            setUser(null);//If invalid or an error occurs, it sets user to null.
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
        if(error.response && !error.response.data.error){
          setUser(null);
        }
      
        
      } finally {
        setLoading(false);//Finally, it sets loading to false, indicating that the verification process is complete.

      }
    };

    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);//Updates the user state with authenticated user data after a successful login
  };

  const logout = () => {
    setUser(null);// Clears the user state and removes the token from localStorage to log out the user.
    localStorage.removeItem('token');
  };

  return (
    //The userContext.Provider component makes the values (user, login, logout, and loading) available to any component that consumes this context.
    <userContext.Provider value={{ user, login, logout, loading  }}>
      {children}
      {/* children presents any nested components inside Authcontext */}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);//he useAuth hook simplifies access to the context by allowing any component to call useAuth() to get the authentication state and functions (like user, login, etc.).

export default AuthContext;
/*Summary of Functionality
Automatic User Verification: When the app loads, it automatically checks if a token is valid and retrieves the user's data.
Login and Logout: Functions to set or clear the user state.
Protected Data Access: Components can use useAuth() to check if a user is authenticated before rendering certain routes or features.*/