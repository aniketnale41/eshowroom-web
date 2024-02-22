import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'

export const Navbar = () => {

    const [menu,setMenu] = useState("shop");
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt=""/>
        <p>SHOWROOM</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("cars")}}><Link style={{ textDecoration:'none'}} to='/category/car'>Cars</Link>{menu==="cars"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("motorcycles")}}><Link style={{ textDecoration:'none'}} to='/category/motorcycle'>MotorCycles</Link>{menu==="motorcycles"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("bicycles")}}><Link style={{ textDecoration:'none'}} to='/category/bicycle'>Bicycles</Link>{menu==="bicycles"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">0</div>
        </div>
    </div>
  )
}

export default Navbar