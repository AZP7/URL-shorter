import React, { useEffect, useState } from 'react'
import '../Navbar/Navbar.css'
import logo from '../assets/images/logo.svg'
import icon from '../assets/images/icon-menu.svg'

function Naavbar(){

    const [openNav, setOpenNav] = useState(false)

    const [overMobile,setOverMobile] = useState()

    useEffect(()=>{
        const HandleResize = ()=>{
            setOverMobile(()=>{return window.innerWidth > 768 })
            setOpenNav(false)
        }
        window.addEventListener('resize',HandleResize)
        HandleResize()
        return(()=>{
            window.removeEventListener('resize',HandleResize)
        })
    },[])
    
    const HandleNav = ()=>{
        setOpenNav(prev=>!prev)
    }


    return(

        <>
        <header className='m_header d-flex justify-content-between justify-content-md-around align-items-center'>
            <img src={logo} alt="Logo" />

            {
                overMobile ? 
                <nav className='d_nav d-flex justify-content-between align-items-center'>
                    <ul className='d_ul m-0 d-flex align-items-center justify-content-evenly justify-content-lg-start '>
                        <li>Features</li>
                        <li>Pricing</li>
                        <li>Resources</li>

                    </ul>
                    <div className='d_btn_container d-flex align-items-center justify-content-between justify-content-lg-end '>
                        <button>Login</button>
                        <button>Sign Up</button>
                    </div>
                </nav>
                 :
                <img src={icon} className='menu' onClick={()=>HandleNav()} alt="" />

            }

            {
                overMobile? 

                null
                :
                <nav className={`mobile_nav position-absolute ${openNav? 'open' : ''}`}>
                    <ul className='mobile_ul d-flex flex-column p-0 align-items-center justify-content-center'>
                        <li>Features</li>  
                        <li>Pricing</li>
                        <li>Resources</li>
                    </ul>
                    <div className='m_btn_container d-flex  flex-column align-items-center'>
                            <button className=' mb-3 mt-3' >Login</button>
                            <button className=' mb-4' >Sign Up</button>
            
                    </div>
                </nav>
            }
        </header>
        </>
        
  )
}

export default Naavbar