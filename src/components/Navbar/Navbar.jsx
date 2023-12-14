import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div>
      <ul className='navBarUl'>
        <li className='navBarli'><NavLink to={"/"}>Home</NavLink></li>
        <li className='navBarli'><NavLink to={"/Favorites"}>Favorites</NavLink></li>
        <li className='navBarli'><NavLink to={"/AboutUs"}>About Us</NavLink></li>
      </ul>
    </div>
  )
}

export default Navbar