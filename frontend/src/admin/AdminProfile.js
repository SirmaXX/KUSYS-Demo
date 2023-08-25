import React, { } from "react";
import {useNavigate} from "react-router-dom";
import AdminNavbar  from "./AdminComponents.js";
 
export default function AdminProfile(){
    const navigate = useNavigate();

   
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const id= localStorage.getItem('userId');
    
  
    return(
        <>
        <AdminNavbar/>
            <div style = {{minHeight: 800, marginTop: 20 }}>
            <h1>Profile Page</h1>
            {username && <p>Welcome, {username}!</p>}
        {email && <p>Email: {email}</p>}
        {id&& <p>id: {id}</p>}
        
               
            </div>
             
        </>
    )
}