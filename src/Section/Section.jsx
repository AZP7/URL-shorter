import React, { useEffect, useState } from 'react';
import './Section.css';
import workingIcon from '../assets/images/illustration-working.svg'
import brand from '../assets/images/icon-brand-recognition.svg'
import detail from '../assets/images/icon-detailed-records.svg'
import fully from '../assets/images/icon-fully-customizable.svg'

function Section() {
    const [error, setError] = useState('')

    // State to track loading state during API calls
    const [isLoading, setIsLoading] = useState(true)
    
    const APIKEY = 'bilO7Dwf6dDFhfufeUu32WvPsjhdKVu8KL6y5QT43zQPvvIyxNT2Vl5TKalL';
    
    // API endpoint for URL shortening (note: has duplicate /api in path)
    const URL = `https://api.tinyurl.com/create?api_token=${APIKEY}`;  
  
    // const URL = `https://api.tinyurl.com/create`;  
    const [takeLink, setTakeLink] = useState('')
    const [originalLink,setOriginalLink] = useState([])
  
    // State to store shortened URLs returned from API
    const [ShowResult,setShowResult] = useState([])
  
    // State to track which URL was last copied for UI feedback
    const [copy,setCopy] = useState('')

    // Async function to handle URL shortening via API call
    const HandleShortURl = async () => {
        
        // Validate that user has entered a URL
        if(takeLink.length > 0){
            setError('')
            try {
                setIsLoading(true)

                // Make POST request to URL shortening API
                const response = await fetch(`${URL}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({ url: takeLink })
                });
                if(!response.ok){
                    const ErrorData = await response.json()
                    throw new Error(ErrorData.message || "Failed to shorten URL!")
                }

                const apidata = await response.json();
                

                setShowResult( prev=>(
                    prev.includes(apidata.data.tiny_url) ? prev : [...prev,apidata.data.tiny_url]
                ) )
                setOriginalLink(prev=>[...prev,takeLink])
                setTakeLink('')
            } 
            catch (error) {

                // Handle API errors
                setError(error.message || "Something went wrong!");
            } finally {
                // Reset loading state regardless of success/failure
                setIsLoading(false);
            }
        }
        else{
            setError('Please enter a link')
        }   

    }

    // Event handler for input field changes
    const GetTheLink = (e)=>{
       setTakeLink( e.target.value)
    }

    // Wrapper function to trigger URL shortening
    const Generate = () => {
        HandleShortURl();
    }

    // Function to copy shortened URL to clipboard with visual feedback
    const copyText =async (text)=>{
        try{
            // Use clipboard API to copy text
            await navigator.clipboard.writeText(text);  
            setCopy(text)
            setTimeout(() => {
                setCopy('')
            }, 2000);
        }catch(error){
            console.log('cannot copy!')
        }
    }
    
    // State to track if we're on desktop viewport
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

        {/* Hero section with illustration and intro text */}
        <div className="main d-lg-flex flex-lg-row-reverse justify-content-lg-between align-items-lg-start">

            {/* Working illustration container */}
            <div className='icon_container '>
                <img src={workingIcon} alt="" className='' />
            </div>

                {/* Conditional rendering based on viewport size */}
                {
                    desktop ? 
                    // Desktop layout: horizontal layout with larger text
                    <div className="D_intro ">
                            <h1 className='mb-3 mt-4'>More than just shorter links</h1>
                            <p className='mt-5 mb-5'>Build your brand recognition and get detailed insights on 
                                how your links are performing.
                            </p>
                            <button className='ps-3 pe-3 fs-2 text-light border-0 pb-2 rounded rounded-5'>Get started</button>
                    </div>
                    :                            
                    // Mobile layout: centered vertical layout
                    <div className="intro d-flex flex-column align-items-center">
                        <h1 className='text-center mb-3'>More than just shorter links</h1>
                        <p className='text-center'>Build your brand recognition and get detailed insights on 
                            how your links are performing.
                        </p>
                        <button className='mt-3 rounded-4'>Get started</button>
                    </div>
            }

        </div>
        
        {/* URL shortening section */}
        <div className="create_links mt-5 d-flex flex-column align-items-center justify-content-start">
            
            {/* URL input form container */}
            <div className='get_Link ps-lg-3 pe-lg-3 pt-lg-4 pb-lg-4 justify-content-lg-around flex-lg-row border rounded rounded-3 d-flex flex-column align-items-center justify-content-center '>
                {/* URL input field */}
                <input type="text" value={takeLink} onChange={GetTheLink} placeholder='Shorten a link here' className='mt-3 ps-lg-2 pe-lg-2 pt-lg-2 pb-lg-2 border-0 mb-3 rounded rounded-3'/>
               
                {/* Error message display - mobile only */}
                {desktop ? null :error.length >0 ?  <p className="error-message">{error}</p> : null}
                
                {/* Shorten button */}
                <button  onClick={Generate} className={`mb-3 mb-lg-0 border-0 ps-lg-2 pe-lg-2 pt-lg-2 pb-lg-2 rounded rounded-3 ${isLoading ? "loadingState" : null}`} >
                    {
                        isLoading ? "Loading..." : "Shorten It!"
                    }
                </button>

            </div>
            {/* Error message display - desktop only */}
            {desktop ?  error && <p className="error-message text-danger mt-2 fs-4">{error}</p> :null}

            {/* Results container for displaying shortened URLs */}
            <div className='results-container w-100 d-flex flex-column  justify-content-center align-items-center'>
                {/* Map through results and display each shortened URL with original */}
                {
                    ShowResult.map((content,index)=>(
                        originalLink.map((link,index1)=>(
                            index === index1 ?
                                // Individual result item with original URL, shortened URL, and copy button
                                <div key={index} className={`result_link mt-4 flex-lg-row rounded rounded-3 border d-flex flex-column align-items-center justify-content-center `}>
          
                                    {/* Original URL display */}
                                    <span key={index1} className='original_link me-lg-3 pt-2 ps-2 pb-2 border-bottom border-2 text-left'>{link}</span>
                                    {/* Shortened URL display */}
                                    <span className='short_link ms-lg-3 me-lg-2 pt-3 ps-2 pb-3 text-left text-wrap'>{content}</span>
                                    {/* Copy button with dynamic text based on copy state */}
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

        {/* Statistics section with feature cards */}
        <div className="statistics mb-lg-5 mt-5 d-lg-flex flex-lg-column align-items-lg-center justify-content-lg-center">
            {/* Section header */}
            <div className="advance">
                <h1 className='mt-3 fs-1 mb-lg-3'>Advance Statistics</h1>
                <p className='text-center ps-3 pe-3 fs-5'>Track how your links are performing across the web with our
                    advanced statistics dashboard.
                </p>
            </div>
            {/* Three feature cards container */}
            <div className="three_things mb-lg-5 justify-content-lg-evenly flex-lg-row w-100 d-flex flex-column align-items-center justify-content-center">
                {/* Brand Recognition feature card */}
                <div className="brand ">
                    <img src={brand} alt="" />
                    <h1 className='mt-5 mb-3 text-left ps-3'>Brand Recogtion</h1>
                    <p className='text-center ps-3 pe-3 fs-5'>Boost your brand recognition with each click.Generic links 
                        don't mean a thing.Branded links help instil confidence in your content.
                    </p>
                </div>
                {/* Detailed Records feature card */}
                <div className="detail">
                    <img src={detail} alt="" />
                    <h1 className='mt-5 mb-3 ps-3'>Detailed Records</h1>
                    <p className='text-center ps-3 pe-3 fs-5'>Gain insights into who is clicking your links.Knowing when where people engage
                        with your content helps infog better decisions.
                    </p>
                </div>
                {/* Fully Customizable feature card */}
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