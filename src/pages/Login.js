import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../helpers/authcontext'
import { useNavigate } from 'react-router-dom'


function Login() {

    const Navigate=useNavigate()

    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const[userdata,setUserdata]=useState([])

    const {authstate,setAuthstate}=useContext(AuthContext)


const onlogin=(e)=>{
    e.preventDefault()
    axios.post("https://finance-tracker-api-8ohb.onrender.com/signin",{email,password})
    .then((res)=>{
        if(res.data.error){alert(res.data.error)}
        else{
          localStorage.setItem("accesstoken",res.data.token)
          setAuthstate(true)
          Navigate("/")

        }
    })

}


  return (
    <div>
      <br></br>

      <h5>Login page</h5>
      <br></br>

      <form className='form-group' onSubmit={onlogin}>
<div>
            <label >EMAIL</label><input className='col-sm-12 col-md-5 form-control' type='text' name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='email' required></input>
            <br></br></div>
            <label >PASSWORD</label><input className=' col-sn-12 col-md-5 form-control' type='text' name='password' onChange={(e)=>setPassword(e.target.value)} placeholder='password' required></input>
            <br></br>
            <button className='btn btn-primary'>subbmit</button>


        </form>
    </div>
  )
}

export default Login
