import './App.css';
import{BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import Reg from './pages/Reg';
import Login from './pages/Login';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from './helpers/authcontext'
import axios from 'axios';
import Update from './pages/Update';
import { useNavigate } from 'react-router-dom';

function App() {
  const[authstate,setAuthstate]=useState(localStorage.getItem("accesstoken"))
  const[userdata,setUserdata]=useState([])

  useEffect(()=>{
    axios.get("https://finance-tracker-api-8ohb.onrender.com/auth",{headers:{accesstoken:localStorage.getItem("accesstoken")}})
    .then((res)=>{
      if(res.data.error){
        setUserdata([])

      }else{
        setUserdata(res.data)
      }
    })
  })






  return (
    <div className="container">
      <div className='row navbar'>
      <nav className='col'>FINANCE TRACKER</nav>
      </div>


<AuthContext.Provider value={{authstate,setAuthstate,userdata,setUserdata}}>
<Router>
    <Routes>

        <Route path="/" element={<Home/>}></Route>
        <Route path="/reg" element={<Reg/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/update/:transid" element={<Update/>}></Route>







    </Routes>
</Router>
</AuthContext.Provider>








    </div>
  );
}

export default App;
