
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import About from './components/AboutPage';
import Home from './components/HomePage';
import Deneme from './components/Deneme';
import Login from './components/Login';


function App() {
 
  return (
    <Router>

        {/* 👇️ Wrap your Route components in a Routes component */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/deneme" element={<Deneme />} />
          <Route path="/login" element={<Login />} />
          {/* 👇️ handle dynamic path */}
        
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
    </Router>



  );
}



export default App;
