import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import './CSS/LoginSignup.css'
import axios from "axios";
import { Loading, Notify } from 'notiflix';
import AuthContext from '../Context/AuthContext';

export const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [privacyCheck, setPrivacyCheck] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`/api/auth`, "/login")
      .then((res) => {
        navigate("/")
      })
      .catch((error) => {
      });
  }, []);

  const onContinueClick = () => {
    if (privacyCheck && state == "Sign Up") {
      Loading.arrows();
      const payload = {
        name: name,
        email: email,
        password: password
      }
      axios.post("/api/users", payload).then((res) => {
        Loading.remove();
        Notify.success("User Created!")
        setName("")
        setEmail("")
        setPassword("")
        setPrivacyCheck(false)
        setState("Login")
      }).catch((err) => {
        Loading.remove();
        console.log("error occured", err);
        Notify.failure("Failed to create user, try again.")
      })
    } else if (state == "Login") {
      const payload = {
        email: email,
        password: password
      }
      axios.post("/api/login", payload).then((res) => {
        Loading.remove();
        Notify.success("Login Success!")
        setLoggedIn(true)
        // if(res.data == "/"){
        //   window.location.reload();
        // }else{
        // }
        navigate(res.data);
        
      }).catch((err) => {
        Loading.remove();
        console.log("error occured", err);
        Notify.failure("Login attempt failed, Incorrect email/password combination, try again.")
      })
    }
  }

  return (
    <div className='loginsingup mb-8'>
      <div className="loginsignup-container">
        <h1 className='text-red-600 text-3xl font-serif font-extrabold'>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input type="text" placeholder="Your Name" value={name} onInput={(e) => { setName(e.target.value) }} /> : <></>}
          <input type="email" placeholder="Email Address" value={email} onInput={(e) => { setEmail(e.target.value) }} />
          <input type="password" placeholder="Password" value={password} onInput={(e) => { setPassword(e.target.value) }} />
        </div>
        {state === "Sign Up" ? <div className="loginsignup-agree">
          <input className='size-8' type="checkbox" name='' id='' onChange={() => { setPrivacyCheck(!privacyCheck) }} />
          <p>By contining, i agree to the terms of use & privacy policy</p>
        </div> : <></>}
        <button className='button-login' onClick={() => onContinueClick()}>Continue</button>
        {state === "Sign Up" ?
          <p className="loginsignup-login">Already have an account? <button className='text-red-500' onClick={() => { setState("Login") }}>Login here</button></p> :
          <p className="loginsignup-login">Create an account? <button className='text-red-500' onClick={() => { setState("Sign Up") }}>Click here</button></p>}
      </div>
    </div>
  )
}
export default LoginSignup