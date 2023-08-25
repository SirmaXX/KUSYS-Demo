import React, { } from "react";
import {useNavigate} from "react-router-dom";
import Navbar  from "./UserComponents.js";
 
export default function Profile(){
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
        <Navbar/>
            <div style = {{minHeight: 800, marginTop: 20 }}>
            <h1>Profile Page</h1>
            {username && <p>Welcome, {username}!</p>}
        {email && <p>Email: {email}</p>}
        {id&& <p>id: {id}</p>}
        
                <div>
                
                    <button type = 'button' className="btn btn-success btn-lg" onClick= {signOut}>Sign Out</button>
                </div>
            </div>
             
        </>
    )
}