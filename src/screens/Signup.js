import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';


export default function Signup() {

    const [credentials,setcredentials] = useState({name:"",password :"" , email:"",geolocation:""});
    let Navigate = useNavigate();

    const handleSubmit = async(e) =>{
    
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/creatuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:credentials.name,
                password : credentials.password,
                email : credentials.email,
                location : credentials.geolocation
            })
        });
        const json = await response.json();
        console.log(json);
        if(!json.success){
            console.log(json);
            alert("Enter valid Credentials!")
        }
        else{
            Navigate("/login")
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
      }
  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
        <div className='mb-5'>
            <Navbar/>
        </div>
    <div className="container ">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} id="exampleInputEmail1" onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control"name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}/>
            
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} id="exampleInputPassword1" onChange={onChange}/>
        </div>
        
        <button type="submit" className="btn btn-success" to='/'>Submit</button>
        <Link to="/login" className='m-3 btn btn-danger'>Already a user?</Link>
        </form>
        
        </div>
    </div>
  )
}
