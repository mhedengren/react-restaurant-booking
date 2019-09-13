import React from 'react'
import './About.scss'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faFacebookF,
faTwitter,
faInstagram
} from "@fortawesome/free-brands-svg-icons";
import Header from '../Header/Header';

const About = () => {
  return (
    <div>
      <div className='about-mobile'>
        <Header />
        <div className='about-box-white'>
          <div className='black-border-about'>
            <p className='about-text-name'>JOHN J. ANDERSEN . </p>
            <p className='about-text-quote'>EXPERTISE STEMS FROM PASSION .</p>
            <p className='about-text-title'>-CHEF</p>
            <p className='about-text-paragraph'>
              With his unparalleled experience and expertise, John created JUNE. I
              put all my passion and devotion into this. Taste, style and message.
              Those are what count when we choose our menu.
            </p>
          </div>
        </div>{/*Closing about-box-white*/}
        <div className='image-container'></div>
        <footer className='footer-mobile'>
          <div className='social-icons'>
            <FontAwesomeIcon icon={faFacebookF} size='1x'style={{ padding: '7px', color: 'black' }}/>
            <FontAwesomeIcon icon={faInstagram} size='1x' style={{ padding: '7px', color: 'black' }}/>
            <FontAwesomeIcon icon={faTwitter} size='1x'style={{ padding: '7px', color: 'black' }}/>
          </div>{/*Closing social-icons*/}
          <div className='page-number-wrapper'>
            <div className='vl'></div>
            <span className='page'>03.</span>
          </div>{/*Closing page-numer-wrapper*/}
        </footer>
      </div>{/*Closing main div for about-mobile*/}

      {/* Tablet and Desktop */}
      <div className='about-wrapper-desktop'>
        <div className='about-left-section'>
          <div className='logo-container-about'>
            <NavLink className='logo-about' to='/'>
              <h1>june.</h1>
            </NavLink>
          </div>
          <div className='about-text-desktop'>
            <div className='about-paragraph-desktop'>
              <p className='about-text-name-desktop'>JOHN J. ANDERSEN . </p>
              <p className='about-text-quote-desktop'>EXPERTISE STEMS FROM PASSION.</p>
              <p className='about-text-title-desktop'>-CHEF</p>
              <p className='about-text-paragraph'>
                With his unparalleled experience and expertise, John created <b>june.</b>
                 I put all my passion and devotion into this. Taste, style and
                message. Those are what count when we choose our menu.
              </p>
              <footer className="social-media-buttons-about">
                    <div className="social-icons">
                            <FontAwesomeIcon icon={faFacebookF} size="1x" style={{ padding: '1.5em', color: 'black' }}/>
                            <FontAwesomeIcon icon={faInstagram} size="1x" style={{ padding: '1.5em', color: 'black'  }}/>
                            <FontAwesomeIcon icon={faTwitter} size="1x" style={{ padding: '1.5em', color: 'black'  }} />
                    </div>
                </footer>
            </div>
          </div>
        </div>

        <div className='about-right-section'>
          <nav className='main-navigation-about'>
            <NavLink className='nav-link' to='/booking'>book</NavLink>
            <NavLink className='nav-link' to='/about'>about</NavLink>
          </nav>
          <div className='about-image-container'>
          <div className="about-page-number-wrapper">
              <div className="about-vl"></div>
                <span className="about-page">03.</span>
              </div>
          </div>
        </div>
      </div>
    </div> /*Closing main div for entire page*/
  )
}


export default About