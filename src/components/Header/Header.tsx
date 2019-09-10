import React from 'react'
import {NavLink} from 'react-router-dom'
import './header.scss'

const Header = () => {
    return(
        <header>
            <nav className="main-navigation">
                < NavLink className="logo" to="/"><h1>june.</h1></NavLink>
                <NavLink className="about" to="/about">about us</NavLink>
                <NavLink className="booking" to="/booking">book a table</NavLink>
                <NavLink className="adminlink" to="/admin">admin</NavLink>
            </nav>
        </header>
    )
};

export default Header
