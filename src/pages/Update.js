import React, { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../helpers/authcontext'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

function Update() {

   

const Navigate=useNavigate()
const {transid}=useParams()
const{authstate}=useContext(AuthContext)
const[data,setData]=useState([])
const[desc,setDesc]=useState('')
const[amount,setAmount]=useState('')
const[trans,setTrans]=useState('')
const[tr,setTr]=useState('')





useEffect(()=>{
    axios.get(`https://finance-tracker-api-8ohb.onrender.com/update/${transid}`)
    .then((res)=>{
        setData(res.data)
        setDesc(res.data.desc)
        setAmount(res.data.amount)
        setTrans(res.data.trans)
        setTr(res.data.trans)

    })
},[])

const onsubmit=(e)=>{
  e.preventDefault()
  axios.put(`https://finance-tracker-api-8ohb.onrender.com/update/${transid}`,{desc,amount,trans})
  .then((res)=>{
      alert(res.data)
      Navigate("/")
  })

}


  return (
    <div>
      <br></br>
      <h4>Update page</h4>
      {(!authstate)? Navigate('/login')
      :
      (<>
      
      <br></br>
      <h3>this transaction is basically <b>{tr=="cr"?"CREDIT":"DEBIT"}</b> transaction</h3>
      <br></br>
      
      <form className='form-group' onSubmit={onsubmit}>
        
      <label>DESC</label> <input className='col-sm-12 col-md-5 form-control' type='text' name='desc' onChange={(e)=>setDesc(e.target.value)} defaultValue={data.desc} placeholder='desc'></input><br></br>
      <label>AMOUNT</label> <input className='col-sm-12 col-md-5 form-control' type='number' name='amount' onChange={(e)=>setAmount(e.target.value)} defaultValue={data.amount} placeholder='amount'></input><br></br>
      <label>TRANSACTION TYPE</label><br></br>
                <input   onChange={(e)=>setTrans(e.target.value)} type="radio" name='trans' id='db' value="db" ></input><label className='form-check-label' for="db">debit</label><br></br>
                <input  onChange={(e)=>setTrans(e.target.value)} type="radio" name='trans' id='cr' value="cr" ></input><label className='form-check-label' for="cr">credit</label><br></br>
                <br></br>
                

                <button className='btn btn-primary'>submit</button>
        </form>

      
      </>)}
    </div>
  )
}

export default Update
