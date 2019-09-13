import React from 'react'
import './notfound.scss'
import {NavLink} from 'react-router-dom'

const NotFound = () => {
    return(
        <div className="notfound-wrapper">
            <h2>404 page not found.</h2>
            <h3>we do apologize. </h3>
            <NavLink className='notfound-logo' to='/'>
            <h1>take me back: june</h1>
            </NavLink>
        </div>
    )
}

export default NotFound