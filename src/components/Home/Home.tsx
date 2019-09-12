import React from 'react'
import './home.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import Header from '../Header/Header';




const Home = () => {
    return(
        <div>{/* opening div for page */}  
            <div className="mobile-landing-page">
                <Header />
                <div className="welcome"></div>
                <div className="whiteBox">
                    <div className="welcomeTextBox">
                        <p className="welcomeText">welcome . </p>
                        <p className="adressText">regeringsgatan 67</p>
                    </div>
                </div>{/* closing div for whiteBox */} 
                <footer className="footer-mobile">
                    <div className="social-icons">
                            <FontAwesomeIcon icon={faFacebookF} size="1x" style={{ padding: '7px', color: 'black' }}/>
                            <FontAwesomeIcon icon={faInstagram} size="1x" style={{ padding: '7px', color: 'black'  }}/>
                            <FontAwesomeIcon icon={faTwitter} size="1x" style={{ padding: '7px', color: 'black'  }} />
                    </div>
                    <div className="page-number-wrapper">
                            <div className="vl"></div>
                            <span className="page">01.</span>
                    </div>
                </footer>
            </div>{/* closing div for mobile-landing-page */} 

            <div className="desktop-landing-page">
                <Header />

                <div className="entry-text">
                    <h2>welcome.</h2>
                    <h3>regeringsgatan 67</h3>
                </div>
                <footer className="footer-desktop">
                    <div className="social-icons">
                            <FontAwesomeIcon icon={faFacebookF} size="1x" style={{ padding: '7px', color: 'white' }}/>
                            <FontAwesomeIcon icon={faInstagram} size="1x" style={{ padding: '7px', color: 'white'  }}/>
                            <FontAwesomeIcon icon={faTwitter} size="1x" style={{ padding: '7px', color: 'white'  }} />
                    </div>
                    <div className="page-number-wrapper">
                         <div className="vl"></div>
                        <span className="page">01.</span>
                    </div>
                </footer>
            </div>  
        
           
        </div>  
        
    )
}

export default Home