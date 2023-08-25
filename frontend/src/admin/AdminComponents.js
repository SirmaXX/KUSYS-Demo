import React, { } from "react";
import {useNavigate} from "react-router-dom";
 
export default function AdminNavbar(){
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem('Token');
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
           <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="#">User Paneli</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample04">
        <ul className="navbar-nav mr-auto">
       
          <li className="nav-item">
            <a className="nav-link" href="/admin/profile">Profile</a>
          </li>
        
          <li className="nav-item">
            <a className="nav-link" href=" /admin/courses">Courses</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href=" /admin/users">Users</a>
          </li>
         
        </ul>
        <form className="form-inline my-2 my-md-0">
        <button type = 'button' className="btn btn-success btn-lg" onClick= {signOut}>Sign Out</button>
        </form>
      </div>
    </nav>
        </>
    )
}


