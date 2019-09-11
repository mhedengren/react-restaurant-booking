import React from 'react'
import './About.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import Header from '../Header/Header';

const About = () => {
    return(
        <div>  
            <div className="about-mobile">
                <Header />
                <div className="about-box-white">
                    <div className="black-border-about">
                        <p className="aboutTextName">JOHN J. ANDERSEN . </p>
                        <p className="aboutTextQuote">EXPERTISE STEMS FROM PASSION .</p>
                        <p className="aboutTextTitle">-CHEF</p>
                        <p className="aboutTextParagraph">With his unparalleled experience and expertise, John created JUNE. 
                            I put all my passion and devotion into this. Taste, style and message. 
                            Those are what count when we choose our menu.</p>
                    </div>
                </div>{/*Closing about-box-white*/}
                <div className="image-container"></div>
                <footer className="footer-mobile">
                    <div className="social-icons">
                        <FontAwesomeIcon icon={faFacebookF} size="1x" style={{ padding: '7px', color: 'black' }}/>
                        <FontAwesomeIcon icon={faInstagram} size="1x" style={{ padding: '7px', color: 'black'  }}/>
                        <FontAwesomeIcon icon={faTwitter} size="1x" style={{ padding: '7px', color: 'black'  }} />
                    </div>{/*Closing social-icons*/}
                    <div className="page-number-wrapper">
                            <div className="vl"></div>
                            <span className="page">01.</span>
                    </div>{/*Closing page-numer-wrapper*/}
                </footer>
            </div>{/*Closing main div for about-mobile*/}
            
                <div className="about-desktop"> 
                <Header />
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
            </div>{/*Closing main div for about-desktop*/} 
        </div>/*Closing main div for entire page*/     
    )
}       


export default About