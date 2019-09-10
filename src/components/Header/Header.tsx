import React from 'react'
import {NavLink} from 'react-router-dom'
import './header.scss'

const Header = () => {
    return(
        <header>
            <div className="logo-wrapper">
                <NavLink className="logo" to="/"><h1>june . </h1></NavLink>
            </div>
            <nav className="main-navigation">
                <NavLink className="about" to="/about">about us</NavLink>
                <NavLink className="booking" to="/booking">book a table</NavLink>
                <NavLink className="adminlink" to="/admin">admin</NavLink>
            </nav>
        </header>
    )
};

export default Header
