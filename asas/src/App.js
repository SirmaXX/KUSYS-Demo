import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import About from './components/AboutPage';
import Home from './components/HomePage';
import Deneme from './components/Deneme';
export default function App() {


  return (
    <Router>

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Tenth navbar example">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
            <ul class="navbar-nav">

              <li class="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li class="nav-item">
                <Link to="/about">About</Link>
              </li>
              <li class="nav-item">
                <Link to="/deneme">Deneme</Link>
              </li>
              <li class="nav-item">
                <Link to="/users/4200">Users</Link>
              </li>
              <li class="nav-item">
                <Link to="/does-not-exist">Page Not Found</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div>

        {/* 👇️ Wrap your Route components in a Routes component */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/deneme" element={<Deneme />} />
          {/* 👇️ handle dynamic path */}
          <Route path="/users/:userId" element={<Users />} />
          <Route path="/" element={<Home />} />
          {/* 👇️ only match this when no other routes match */}
          <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found etc</h2>
                <br></br>

              </div>
            }
          />
        </Routes>
      </div>
    </Router>



  );
}


function Users() {
  const params = useParams();

  return <h2>Users: {params.userId}</h2>;
}
