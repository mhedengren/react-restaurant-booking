import React from 'react'
import {NavLink} from 'react-router-dom'
import './header.scss'

const Header = () => {
    return(
        <div>
            <header className="header-mobile">
                <nav className="main-navigation-mobile">
                <NavLink className="nav-link-booking" to="/booking">book a table</NavLink>
                <NavLink className="logo" to="/"><h1>june.</h1></NavLink>
                <NavLink className="nav-link-about" to="/about">about us</NavLink>
                <NavLink className="nav-link-adminlink" to="/admin">admin</NavLink>
                </nav>
            </header>

            <header className="header-desktop">
                <div className="header-desktop-wrapper">
                    <div className="logo">
                        <NavLink className="logo" to="/"><h1>june.</h1></NavLink>
                    </div>
                    <nav className="main-navigation">
                        <NavLink className="nav-link-about" to="/about">about</NavLink>
                        <NavLink className="nav-link-booking" to="/booking">book</NavLink>
                        <NavLink className="nav-link-adminlink" to="/admin">admin</NavLink>
                    </nav>
                </div>
            </header>
        </div>
    )
};

export default Header
