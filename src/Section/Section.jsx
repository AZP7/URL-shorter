import React, { useEffect, useState } from 'react';
import './Section.css';
import workingIcon from '../assets/images/illustration-working.svg'
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
    const [desktop,setDesktop] = useState()
    
    useEffect(()=>{
        const HandleResize = ()=>{
            setDesktop(()=>{return window.innerWidth > 991 })
        }

        window.addEventListener('resize',HandleResize)
        HandleResize()
        return(()=>{
            window.removeEventListener('resize',HandleResize)
        })

    },[])



  return(
    <section className='section_'>

        <div className="main d-lg-flex flex-lg-row-reverse justify-content-lg-between align-items-lg-start">

            <div className='icon_container '>
                <img src={workingIcon} alt="" className='' />
            </div>

                {
                    desktop ? 
                    <div className="D_intro ">
                            <h1 className='mb-3 mt-4'>More than just shorter links</h1>
                            <p className='mt-5 mb-5'>Build your brand recognition and get detailed insights on 
                                how your links are performing.
                            </p>
                            <button className='ps-3 pe-3 fs-2 text-light border-0 pb-2 rounded rounded-5'>Get started</button>
                    </div>
                    :                            
                    <div className="intro d-flex flex-column align-items-center">
                        <h1 className='text-center mb-3'>More than just shorter links</h1>
                        <p className='text-center'>Build your brand recognition and get detailed insights on 
                            how your links are performing.
                        </p>
                        <button className='mt-3 rounded-4'>Get started</button>
                    </div>
            }

        </div>
        
        <div className="create_links mt-5 d-flex flex-column align-items-center justify-content-start">
            
            <div className='get_Link ps-lg-3 pe-lg-3 pt-lg-4 pb-lg-4 justify-content-lg-around flex-lg-row border rounded rounded-3 d-flex flex-column align-items-center justify-content-center '>
                <input type="text" value={takeLink} onChange={GetTheLink} placeholder='Shorten a link here' className='mt-3 ps-lg-2 pe-lg-2 pt-lg-2 pb-lg-2 border-0 mb-3 rounded rounded-3'/>
               
                {desktop ? null :error && <p className="error-message">{error}</p>}
                
                <button  onClick={Generate} className='mb-3 mb-lg-0 border-0 ps-lg-2 pe-lg-2 pt-lg-2 pb-lg-2 rounded rounded-3' >Shorten It!</button>

            </div>
            {desktop ?  error && <p className="error-message text-danger mt-2 fs-4">{error}</p> :null}

            <div className='results-container w-100 d-flex flex-column  justify-content-center align-items-center'>
                {
                    ShowResult.map((content,index)=>(
                        takeLink.map((link,index1)=>(
                            index === index1 ?
                                <div key={index} className='result_link mt-4 flex-lg-row rounded rounded-3 border d-flex flex-column align-items-center justify-content-center'>
          
                                    <span key={index1} className='original_link me-lg-3 pt-2 ps-2 pb-2 border-bottom border-2 text-left'>{link}</span>
                                    <span className='short_link ms-lg-3 me-lg-2 pt-3 ps-2 pb-3 text-left text-wrap'>{content}</span>
                                    <button className='mt-3 mb-3 me-lg-0 rounded rounded-3 border-0 pt-lg-0' onClick={()=>copyText(content)}>
                                        {copy === content ? 'copied' : 'copy'}
                                    </button>
                                </div>
                                : null
                        ))
                    ))
                }

            </div>            
            
        </div>

        <div className="statistics mb-lg-5 mt-5 d-lg-flex flex-lg-column align-items-lg-center justify-content-lg-center">
            <div className="advance">
                <h1 className='mt-3 fs-1 mb-lg-3'>Advance Statistics</h1>
                <p className='text-center ps-3 pe-3 fs-5'>Track how your links are performing across the web with our
                    advanced statistics dashboard.
                </p>
            </div>
            <div className="three_things mb-lg-5 justify-content-lg-evenly flex-lg-row w-100 d-flex flex-column align-items-center justify-content-center">
                <div className="brand ">
                    <img src={brand} alt="" />
                    <h1 className='mt-5 mb-3 text-left ps-3'>Brand Recogtion</h1>
                    <p className='text-center ps-3 pe-3 fs-5'>Boost your brand recognition with each click.Generic links 
                        don't mean a thing.Branded links help instil confidence in your content.
                    </p>
                </div>
                <div className="detail">
                    <img src={detail} alt="" />
                    <h1 className='mt-5 mb-3 ps-3'>Detailed Records</h1>
                    <p className='text-center ps-3 pe-3 fs-5'>Gain insights into who is clicking your links.Knowing when where people engage
                        with your content helps infog better decisions.
                    </p>
                </div>
                <div className="fully">
                    <img src={fully} alt="" />
                    <h1 className='mt-5 mb-3 ps-3'>Fully Customizable</h1>
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