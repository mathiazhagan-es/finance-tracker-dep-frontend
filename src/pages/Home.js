import React from 'react'
import Addform from './Addform'
import Table from './Table'
import { AuthContext } from '../helpers/authcontext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Home() {

const Navigate=useNavigate()
const{authstate,setAuthstate,userdata,setUserdata}=useContext(AuthContext)

const onlogout=()=>{
    localStorage.removeItem("accesstoken")
    setAuthstate(false)
    setUserdata([])
    Navigate("/")


}


  return (
    <div>
      <br></br>
{!authstate?(
    <>
    <h5>you need to Login</h5>
    <br></br>
    <div className='row'>
    <Link className=' col-3 col-md-2 ' to={'/login'}><button className='btn btn-primary'>login</button></Link>
    <Link className='col-3 col-md-2 ' to={'/reg'}><button  className='btn btn-primary'> register</button></Link>
    <div className='col-6'></div>
    </div>
    </>
)
:
(<>
<div className='row'>
<h4  className='col-8 col-sm-5 col-md-4 user'><b>{userdata.email}</b></h4>
<button className='col-6 col-sm-5 col-md-2 col-lg-1 btn btn-danger' onClick={onlogout}>logout</button>
</div>
<br></br>
      <div className='row'>
<div className='col-sm-12 col-md-6'>
      <Addform/>
</div>
<div className='col-sm-12 col-md-6'>
      <Table/>
</div>
      </div>


</>)}
      
    </div>
  )
}

export default Home
