import React from "react";
import "./login.css";
import {BrowserRouter as Router,Routes,Route,Navigate,Link,Outlet,useParams,NavLink,useNavigate,useLocation} from 'react-router-dom'

function Login(){
    return(
        <div className="wrapper fadeInDown">
        <div id='formContent'>
          <form>
            <input type="text" id="login" className="fadeIn second" name="number" placeholder="Mobile No."/>
            <input type="text" id="password" className="fadeIn third" name="otp" placeholder="OTP"/>
            <input type="submit" className="fadeIn fourth" value="Log In"/>
          </form>
        </div>
      </div>
    )
}
export default Login;