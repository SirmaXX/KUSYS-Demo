import React, { useState } from 'react';
import axios from 'axios';
import '../signin.css';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState('');


  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/', {
        username: username,
        email: email,
        password: password,
      });
      
      if (response.status === 201) {
        setSignupSuccess(true);
      } else {
        setSignupError('An error occurred during signup');
      }
    } catch (error) {
      console.error('Login error:', error);
      setSignupError('An error occurred during login');
    }
  };

  return (
    <div class="d-flex align-items-center py-4 bg-body-tertiary">
      <div class="form-signin w-100 m-auto">
      <h2>Login Page</h2>

    
        
        <img class="mb-4 float-center" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    
        <div class="form-floating">
        <input  class="form-control"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
          <label for="floatingInput">Username</label>
          <input  class="form-control"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
    
        
        <button class="btn btn-primary w-100 py-2" onClick={handleSignup} type="submit">Signup</button>
        <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>

   


        {signupSuccess && <p>Signup successful!</p>}
        {signupError && <p>{signupError}</p>}
     

      </div>
    </div>
  );
};

export default Signup;