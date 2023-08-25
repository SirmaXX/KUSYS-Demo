import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminCourse from './admin/AdminCourse';
import AdminLogin from './admin/AdminLogin';
import AdminUser from './admin/AdminUsers';
import AdminProfile from './admin/AdminProfile';
import Profile from './user/Profile.js';
import EnrollCourse  from './user/enrollCourse.js';
import {RequireToken} from './components/Auth.js';

function App() {


  return (

    <Router>
      <Routes>
       
        <Route path="/login" element={ <Login />} />
        <Route path="/admin/login" element={ <AdminLogin />} />
        <Route path="/admin/profile" element={ <RequireToken><AdminProfile /></RequireToken>} />
        <Route path="/admin/courses" element={ <RequireToken><AdminCourse /></RequireToken>} />
        <Route path="/admin/users" element={<RequireToken><AdminUser /></RequireToken>} />
        <Route path="/signup" element={<Signup />} />
        <Route
              path="/profile"
              element={
                <RequireToken>
                  <Profile />
                </RequireToken>
              }
            />
             <Route
              path="/enrollCourse"
              element={
                <RequireToken>
                  <EnrollCourse />
                </RequireToken>
              }
            /> 
        <Route path="/" element={ <Home /> } />
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found etc</h2>
              <br />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;