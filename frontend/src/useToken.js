import { useState } from 'react';

export default function useToken() {
  // Define a function to get the token from localStorage
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  // Initialize the token state using the getToken function
  const [token, setToken] = useState(getToken());

  // Define a function to save the token to localStorage
  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  // Define a function to remove the token from localStorage
  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Return an object containing the setToken, removeToken, and token
  return {
    setToken: saveToken,
    removeToken,
    token
  };
}