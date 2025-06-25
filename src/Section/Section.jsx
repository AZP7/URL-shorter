import React, { useEffect, useState } from 'react';
import './Section.css';
import workingIcon from '../assets/images/illustration-working.svg'
import linkBG from '../assets/images/bg-boost-mobile.svg'
import brand from '../assets/images/icon-brand-recognition.svg'
import detail from '../assets/images/icon-detailed-records.svg'
import fully from '../assets/images/icon-fully-customizable.svg'


function Section() {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const URL = '/api/api/v1/shorten';
    const [takeLink, setTakeLink] = useState([])
    const [ShowResult,setShowResult] = useState([])
    const [copy,setCopy] = useState('')

    const HandleShortURl = async () => {
        if (isLoading) return;
        setIsLoading(true);
        if(takeLink.length === 0){
            setError('Please enter a link')
            return
        }
        else{
            setError('')
        }
        try {
            const response = await fetch(`${URL}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ url: takeLink })
            });
            const data = await response.json();
            setShowResult(prev => [...prev, data.result_url]);

        } catch (err) {
            setError(err.message || 'Failed to shorten URL');
        } finally {
            setIsLoading(false);
        }
    }

    const GetTheLink = (e)=>{

       setTakeLink( prev=> [...prev,e.target.value])

    }

    const Generate = () => {
        HandleShortURl();
    }

    const copyText =async (text)=>{
        try{
            await navigator.clipboard.writeText(text);  
            setCopy(text)
            setTimeout(() => {
                setCopy('')
            }, 2000);
        }catch(error){
            console.log('cannot copy!')
        }
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
                {error && <p className="error-message">{error}</p>}
                
                <button  onClick={Generate} className='mb-3 border-0 rounded rounded-3' >Shorten It!</button>

            </div>
            <div className='results-container w-100 d-flex flex-column  justify-content-center align-items-center'>
                {
                    ShowResult.map((content,index)=>(
                        takeLink.map((link,index1)=>(
                            index === index1 ?
                                <div key={index} className='result_link mt-4 rounded rounded-3 border d-flex flex-column align-items-center justify-content-center'>
          
                                    <span key={index1} className='pt-2 ps-2 pb-2 border-bottom border-2 text-left'>{link}</span>
                                    <span className='short_link pt-3 ps-2 pb-3 text-left text-wrap'>{content}</span>
                                    <button className='mt-3 mb-3 rounded rounded-3 border-0' onClick={()=>copyText(content)}>
                                        {copy === content ? 'copied' : 'copy'}
                                    </button>
                                </div>
                                : null
                        ))
                    ))
                }

            </div>            
            
        </div>

        <div className="statistics mt-5">
            <div className="advance ">
                <h1 className='mt-3 fs-1'>Advance Statistics</h1>
                <p className='text-center ps-3 pe-3 fs-5'>Track how your links are performing across the web with our
                    advanced statistics dashboard.
                </p>
            </div>
            <div className="three_things w-100 d-flex flex-column align-items-center justify-content-center">
                <div className="brand">
                    <img src={brand} alt="" />
                    <h1 className='mt-5 mb-3'>Brand Recogtion</h1>
                    <p className='text-center ps-3 pe-3 fs-5'>Boost your brand recognition with each click.Generic links 
                        don't mean a thing.Branded links help instil confidence in your content.
                    </p>
                </div>
                <div className="detail">
                    <img src={detail} alt="" />
                    <h1 className='mt-5 mb-3'>Detailed Records</h1>
                    <p className='text-center ps-3 pe-3 fs-5'>Gain insights into who is clicking your links.Knowing when where people engage
                        with your content helps infog better decisions.
                    </p>
                </div>
                <div className="fully">
                    <img src={fully} alt="" />
                    <h1 className='mt-5 mb-3'>Fully Customizable</h1>
                    <p className='text-center ps-3 pe-3 fs-5'>Impreove brand awareness content discoverability through customizable links,
                        supercharging audience engagement.
                    </p>
                </div>

            </div>
        </div>

    </section>
)
}
export default Section;