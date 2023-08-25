import React, { useState } from 'react';

import axios from 'axios';
import '../signin.css';

import {useNavigate} from "react-router-dom";
import {setToken, fetchToken} from './Auth.js'
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username: username,
        password: password,
      });
      
      if (response.data.message === true) {
        // Successful login logic, e.g., redirect to a dashboard
        console.log('Login successful');
        console.log(response.data);
        localStorage.setItem('Token', response.data.token);
        try {
          const userResponse = await axios.get(`http://localhost:8000/users/${response.data.user_id}`);
          const userData = userResponse.data;
      
          // Store user details in local storage
          localStorage.setItem('username', userData.username);
          localStorage.setItem('email', userData.email);
          localStorage.setItem('userId', userData.id);
          // Redirect to the profile page
          navigate("/profile");
        } catch (error) {
          console.error('User details fetch error:', error);
          setLoginError('An error occurred during login');
        }
      
        navigate("/profile");
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login');
    }
  };

  return (
    <div class="d-flex align-items-center py-4 bg-body-tertiary">
      <div class="form-signin w-100 m-auto">
      <h2>Login Page</h2>

    
        
       
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    
        <div class="form-floating">
        <input  class="form-control"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating">
        <input  class="form-control"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
        <label for="floatingInput">Password</label>
        </div>
    
        
        <button class="btn btn-primary w-100 py-2" onClick={handleLogin  } type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>

   


      {loginError && <p>{loginError}</p>}
     

      </div>
    </div>
  );
};


export default Login;