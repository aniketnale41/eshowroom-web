import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../Context/AuthContext'
import { ShopContext } from '../../Context/ShopContext'

export const Navbar = () => {

  const [menu, setMenu] = useState("shop");
  const { loggedIn, isAdmin } = useContext(AuthContext);
  const { cartCount } = useContext(ShopContext);

  const onLogout = () => {
    axios.post("/api/logout", null).then((res) => {
      console.log("user logged out")
      window.location.href = "/"
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='navbar'>
      <Link to="/"><div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOWROOM</p>
      </div></Link>
      <ul className="nav-menu">
        <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("cars") }}><Link style={{ textDecoration: 'none' }} to='/category/car'>Cars</Link>{menu === "cars" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("motorcycles") }}><Link style={{ textDecoration: 'none' }} to='/category/motorcycle'>MotorCycles</Link>{menu === "motorcycles" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("bicycles") }}><Link style={{ textDecoration: 'none' }} to='/category/bicycle'>Bicycles</Link>{menu === "bicycles" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {!loggedIn ? <Link to='/login'><button>Login</button></Link> :
          <button onClick={() => onLogout()}>Logout</button>}
        {isAdmin ? <Link to='/dashboard'><button>Dashboard</button></Link> : <></>}
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{cartCount}</div>
      </div>
    </div>
  )
}

export default Navbar