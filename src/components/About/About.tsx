import React from 'react'
import './About.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

  const About = () => {
    return(
        <div>  
            <div className="aboutBoxWhite">
                <div className="blackBorderAbout">
                    <p className="aboutTextName">JOHN J. ANDERSEN . </p>
                    <p className="aboutTextQuote">EXPERTISE STEMS FROM PASSION .</p>
                    <p className="aboutTextTitle">-CHEF</p>
                    <p className="aboutTextParagraph">With his unparalleled experience and expertise, John created JUNE. 
                        I put all my passion and devotion into this. Taste, style and message. 
                        Those are what count when we choose our menu.</p>
                </div>
             </div>
             <div className="sectionTwoAbout"></div>
            <div className="aboutImage"></div>
            <div className="footer">
                <FontAwesomeIcon icon={faFacebookF} size="1x" style={{ padding: '5px' }}/>
                <FontAwesomeIcon icon={faInstagram} size="1x" style={{ padding: '5px' }}/>
                <FontAwesomeIcon icon={faTwitter} size="1x" style={{ padding: '5px' }} />
                <div className="vl"></div>
                <span className="page">03 .</span>
            </div>
           
        </div>     
    )
}


export default About