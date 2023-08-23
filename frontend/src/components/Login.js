import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username: username,
        password: password,
      });
      
      if (response.data === true) {
        // Successful login logic, e.g., redirect to a dashboard
        console.log('Login successful');
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login');
    }
  };

  return (
    <div>
      <h2>Login Page</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {loginError && <p>{loginError}</p>}
     
    </div>
  );
};

export default Login;