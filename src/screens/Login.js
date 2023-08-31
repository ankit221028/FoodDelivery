import { useState } from "react";
import React  from 'react';
import { Link , useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [credentials,setcredentials] = useState({password :"" , email:""});
  let navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                password : credentials.password,
                email : credentials.email
            })
        });
        const json = await response.json();
        console.log(json);
        if(!json.success){
            console.log(json);
            alert("Enter valid Credentials!")
        }
        if(json.success){
          localStorage.setItem("userEmail", credentials.email);
          localStorage.setItem("authToken",json.authToken);
          localStorage.getItem("authToken");
          navigate("/");
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
      }
  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div className='mb-4'>
        <Navbar/>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control"name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}/>
            
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-success">LogIn</button>
        <Link to="/creatuser" className='m-3 btn btn-danger'>New user?</Link>
        </form>
        </div>
    </div>
  )
}
