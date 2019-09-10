import React from 'react'
import './home.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";



const Home = () => {
    return(
        <div>  
            <div className="welcome">
            </div>
            <div className="BeigeBoxOne">
            </div>
            <div className="whiteBox">
                <div className="welcomeTextBox">
                    <p className="welcomeText">welcome . </p>
                    <p className="adressText">regeringsgatan 67</p>
                </div>
            </div>
            <div className="footer">
                <FontAwesomeIcon icon={faFacebookF} size="1x" style={{ padding: '5px' }}/>
                <FontAwesomeIcon icon={faInstagram} size="1x" style={{ padding: '5px' }}/>
                <FontAwesomeIcon icon={faTwitter} size="1x" style={{ padding: '5px' }} />
                <div className="vl"></div>
                <span className="page">01 .</span>
            </div>
           
        </div>     
    )
}

export default Home