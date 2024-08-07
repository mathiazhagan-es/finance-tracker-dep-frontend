import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../helpers/authcontext'
import { Link } from 'react-router-dom'

function Table() {

const{userdata,setAuthstate}=useContext(AuthContext)
const[tabledata,setTabledata]=useState([])

useEffect(()=>{
    axios.post(`https://finance-tracker-api-8ohb.onrender.com/table/${userdata.userid}`,{headers:{accesstoken:localStorage.getItem("accesstoken")}})
    .then((res)=>{
        if(res.data.error){
            setAuthstate(false)
          }else{
            setTabledata(res.data)
          }
    })
})

const ondelete=(transid)=>{
    axios.delete(`https://finance-tracker-api-8ohb.onrender.com/delete/${transid}`)
    .then((res)=>{
        alert(res.data)
    })
}
let db=0
let cr=0

tabledata.map((d)=>{
  if(d.trans=="db"){
    db+=d.amount
  }else{
    cr+=d.amount
  }
})


  return (
    <div>
      

      <table>
        <tr>
          <th colSpan={2}>BALANCE  SHEET</th>
        </tr>
        <tr>
          <th>INCOME</th>
          <td>{cr}</td>
        </tr>
        <tr>
          <th>EXPENCE</th>
          <td>{db}</td>
        </tr><tr>
          <th>BALANCE</th>
          <td>{cr-db}</td>
        </tr>
      </table>
     

      <br></br>
      <h3>Transactions</h3>
<br></br>
      <table>
      <tr>
            <th>index</th>
            <th>desc</th>
            <th>amount</th>
            <th>trans</th>
            <th>time</th>
            <th>delete</th>
            <th>update</th>
        </tr>
        {tabledata.length==0?(<tr><td colSpan={7}>No records found in data base</td></tr>)
        :
        
        <>
        {tabledata.map((d,index)=>(
        <tr key={index}>
            <td>{index+1}</td>
            <td>{d.desc}</td>
            <td>{d.amount}</td>
            <td>{d.trans}</td>
            <td>{d.time}</td>
            <td><button className='btn btn-danger' onClick={()=>ondelete(d.transid)}>delete</button></td>
            <td> <Link to={`/update/${d.transid}`}><button className=' btn btn-primary'>update</button></Link></td>
        </tr>

      ))}
        </>}
      

      </table>
    </div>
  )
}

export default Table
