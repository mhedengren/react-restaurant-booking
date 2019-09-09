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
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/booking">Book</NavLink>
                <NavLink to="/admin">Admin</NavLink>
            </nav>
        </header>
    )
};

export default Header
