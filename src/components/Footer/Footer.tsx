import React from 'react'
import './footer.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";



const Footer = () => {
    return(
        <div>
           <footer className="footer-mobile">
                <FontAwesomeIcon icon={faFacebookF} size="1x" style={{ padding: '5px' }}/>
                <FontAwesomeIcon icon={faInstagram} size="1x" style={{ padding: '5px' }}/>
                <FontAwesomeIcon icon={faTwitter} size="1x" style={{ padding: '5px' }} />
                <div className="vl"></div>
                <span className="page">01 .</span>
           </footer>

           <footer className="footer-desktop">
               
               <div className="social-icons">
                    <FontAwesomeIcon icon={faFacebookF} size="1x" style={{ padding: '5px' }}/>
                    <FontAwesomeIcon icon={faInstagram} size="1x" style={{ padding: '5px' }}/>
                    <FontAwesomeIcon icon={faTwitter} size="1x" style={{ padding: '5px' }} />
               </div>
               <div className="page-number-wrapper">
                    <div className="vl"></div>
                    <span className="page">01 .</span>
               </div>
            </footer>
        </div>
    )
};

export default Footer
