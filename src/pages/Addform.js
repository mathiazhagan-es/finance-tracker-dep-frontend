import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../helpers/authcontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Addform() {
  const Navigate=useNavigate()
    const[desc,setDesc]=useState("")
    const[amount,setAmount]=useState(0)
    const[trans,setTrans]=useState(0)

    const{userdata,setAuthstate}=useContext(AuthContext)

    const onsubmit=(e)=>{
        axios.post(`https://finance-tracker-api-8ohb.onrender.com/addform/${userdata.userid}`,{desc,amount,trans},{headers:{accesstoken:localStorage.getItem("accesstoken")}})
        .then((res)=>{
            if(res.data.error){
                setAuthstate(false)
                Navigate("/")

              }else{
                alert(res.data)
              }
            
        })
    }

   

  return (
    <div>
      <h4>Add your transaction</h4>
      <br></br>



        <form className='form-group' onSubmit={onsubmit}>
                <label>DESC</label><input className='form-control col-11 ' type='text' name='desc' onChange={(e)=>setDesc(e.target.value)} placeholder='desc' required></input><br></br>
                <label>AMOUNT</label><input className='form-control col-11' type='number' name='amount' onChange={(e)=>setAmount(e.target.value)} placeholder='amount' required></input><br></br>
                <label>TRANSACTION TYPE</label><select className='form-control col-11' onChange={(e=>setTrans(e.target.value))}>
                     <option value="0">debit</option>
                      <option value="1">credit</option>
                </select><br></br>
                <button className='btn btn-primary'>submit</button>



        </form>




    </div>
  )
}

export default Addform
