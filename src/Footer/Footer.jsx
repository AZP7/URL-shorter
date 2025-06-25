import React from 'react'
import '../Footer/Footer.css'
import boostL from '../assets/images/bg-boost-mobile.svg'
import facebook from '../assets/images/icon-facebook.svg'
import instagram from '../assets/images/icon-instagram.svg'
import twitters from '../assets/images/icon-twitter.svg'
import pinterest from '../assets/images/icon-pinterest.svg'


function Footer() {
  return (

    <footer className='footer'>

          <div className="boost_L position-relative d-flex align-items-center justify-content-center flex-column"
          >
              <img src={boostL} alt="" className='' />
              <div className="boo_get position-absolute w-100 d-flex flex-column justify-content-center align-items-center">
                  <h1 className='text-light'>Boost your links today</h1>
                  <button className='border-0 rounded rounded-5 mt-3 text-light' >Get Started</button>
              </div>


          </div>

          <div className="about p-0 ">
                <h2 className='text-light pt-4'>Shortly</h2>
                <ul>
                  <span>Features</span>
                  <li>Link Shortening</li>
                  <li>Branded Links</li>
                  <li>Analyticd</li>
                </ul>
                <ul>
                  <span>Resources</span>
                  <li>Blog</li>
                  <li>Developers</li>
                  <li>Support</li>
                </ul>
                <ul>
                  <span>Company</span>
                  <li>About</li>
                  <li>Our Team</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              <div className="social pt-3 pb-3 w-100 d-flex -align-items-center justify-content-center">
                <img src={facebook} alt="" />
                <img src={twitters} alt="" />
                <img src={pinterest} alt="" />
                <img src={instagram} alt="" />

              </div>
          </div>

    </footer>

)
}

export default Footer
