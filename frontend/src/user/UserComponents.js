import React, { } from "react";
import {useNavigate} from "react-router-dom";
 
export default function Navbar(){
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem('cairocodersToken');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        navigate("/");
    }

   
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const id= localStorage.getItem('userId');
    
  
    return(
        <>
           <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand" href="#">User Paneli</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample04">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/profile">Profile</a>
          </li>
        
          <li class="nav-item">
            <a class="nav-link" href=" /enrollCourse">EnrollCourse</a>
          </li>
         
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div class="dropdown-menu" aria-labelledby="dropdown04">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-md-0">
        <button type = 'button' className="btn btn-success btn-lg" onClick= {signOut}>Sign Out</button>
        </form>
      </div>
    </nav>
        </>
    )
}


