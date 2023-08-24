
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';


import Home from './components/HomePage';
import Deneme from './components/Deneme';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminCourse from './admin/AdminCourse';


function App() {
 
  return (
    <Router>

        {/* 👇️ Wrap your Route components in a Routes component */}
        <Routes>
          
          <Route path="/deneme" element={<Deneme />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/course" element={<AdminCourse/>} />
          <Route path="/signup" element={<Signup />} />
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
