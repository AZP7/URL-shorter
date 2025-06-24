import React, { useEffect, useState } from 'react';
import './Section.css';
import workingIcon from '../assets/images/illustration-working.svg'
import linkBG from '../assets/images/bg-boost-mobile.svg'

function Section() {
    const [shortUrl, setShortUrl] = useState();
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const URL = '/api/api/v1/shorten';
    const originalUrl = 'https://ondemand6.scilearn.com/slc/learner?tenantId=1511017';
    const [takeLink, setTakeLink] = useState('')

    const HandleShortURl = async () => {
        if (isLoading) return; // Prevent multiple calls
        setIsLoading(true)
        setIsLoading(true);
        try {
            const response = await fetch(`${URL}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ url: originalUrl })
            });
            const data = await response.json();
            console.log(data);
            setShortUrl(data.result_url);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    const GetTheLink = (e)=>{
        
        setTakeLink(e.target.value)

    }

    const viewLikn = ()=>{
        console.log('link is :', takeLink)
    }
    
    const Generate = () => {
        HandleShortURl();
    }

  return(
    <section className='section_'>

        <div className="main">

            <div className='icon_container'>
                <img src={workingIcon} alt="" />
            </div>

            <div className="intro d-flex flex-column align-items-center">
                <h1 className='text-center mb-3'>More than just shorter links</h1>
                <p className='text-center'>Build your brand recognition and get detailed insights on 
                    how your links are performing.
                </p>
                <button className='mt-3 rounded-4'>Get started</button>
            </div>

        </div>
        
        <div className="create_links mt-5 d-flex flex-column align-items-center justify-content-start">

            <div className='get_Link border rounded rounded-3 d-flex flex-column align-items-center justify-content-center '>
                <input type="text" value={takeLink} onChange={GetTheLink} placeholder='Shorten a link here' className='mt-3 border-0 mb-3 rounded rounded-3'/>
                <p>PLease add a link</p>
                <button  onClick={()=>viewLikn()} className='mb-3 border-0 rounded rounded-3' >Shorten It!</button>
            </div>

            <div className='result_link mt-4 rounded rounded-3 border d-flex flex-column align-items-center justify-content-center'>
                <span className='pt-2 ps-2 pb-2 border-bottom border-2 text-left'>www.google.com</span>
                <span className='short_link pt-3 ps-2 pb-3 text-left'>www.google.com</span>
                <button className='mt-3 mb-3 rounded rounded-3 border-0'>copy</button>
            </div>
        </div>

        <div className="statistics">
            
        </div>

    </section>
)
}
export default Section;