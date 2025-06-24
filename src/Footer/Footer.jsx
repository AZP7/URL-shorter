import React from 'react'
import '../Footer/Footer.css'
import boostL from '../assets/images/bg-boost-mobile.svg'

function Footer() {
  return (

    <footer className='footer'>

          <div className="boost_L d-flex position-relative flex-column align-items-center justify-content-center">
              <img src={boostL} alt="" className='position-absolute' />
              <h1>Boost your links today</h1>
              <button>Get Started</button>

          </div>

    </footer>

)
}

export default Footer
