import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

function Reg() {

const Navigate=useNavigate()

const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const[name,setName]=useState("")


const onregister=(e)=>{
    e.preventDefault()
    axios.post("https://finance-tracker-api-8ohb.onrender.com/signup",{email,password,name})
    .then((res)=>{
        if(res.data.error){alert(res.data.error)}
        else{
            alert(res.data)
            Navigate("/login")
        }
    })
}


  return (
    <div>
            <br></br>

      <h5>Registration page </h5>
      <h5>New User </h5>

      <br></br>

        <form className='form-group' onSubmit={onregister}>
            <label>EMAIL</label><input className='col-sm-12 col-md-5 form-control' type='text' name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='email' required></input><br></br>
            <label>PASSWORD</label><input className='col-sm-12 col-md-5 form-control' type='text' name='password' onChange={(e)=>setPassword(e.target.value)} placeholder='password' required></input><br></br>
            <label>NAME</label><input className='col-sm-12 col-md-5 form-control' type='text' name='name' onChange={(e)=>setName(e.target.value)} placeholder='name' required></input><br></br>
            <button className='btn btn-primary'>subbmit</button>


        </form>


    </div>
  )
}

export default Reg
