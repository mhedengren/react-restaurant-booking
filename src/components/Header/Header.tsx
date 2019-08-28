import React from 'react'
import {NavLink} from 'react-router-dom'
import './header.css'

const Header = () => {
    return(
        <header>
            <div className="logo-wrapper">
                <h1>Logo</h1>
            </div>
            <nav className="main-navigation">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </nav>
        </header>
    )
}

export default Header