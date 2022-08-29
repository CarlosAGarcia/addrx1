import React, { useEffect, useState } from 'react'
import { useStore } from '../../stores/threeStore'
import StyledLanding from './styles/StyledLanding.style.js'
import ContactFormFS from './ContactFormFS'
const WORK = 'WORK'
const ABOUT = 'ABOUT'
const CONTACT = 'CONTACT'

export default function Landing() {
    // animation related vars
        const init = useStore(state => state.init)
        const { totalAnimationTime, isInit } = useStore(state => state)
        useEffect(() => {
            init()
            // animate()
        }, [ init ])
        console.log(isInit)

    // rendering the right content
    const [ contentShown, setContentShown2 ] = useState(null)
        const setContentShown = (e) => {
            console.log(e)
            setContentShown2(e)
        }
  return (
    <StyledLanding>
        <div className={`${isInit ? 'loadIn navBarContainer' : 'd-none'}`}>

            <div className='gridColContainer'>
                <div className='gridInnerContainer' onMouseOver={() => contentShown === WORK ? null : setContentShown(WORK)} onMouseOut={() => setContentShown(null)}>
                    <div className={`work textContainer slide-tr`} >
                        <div className='text' >{WORK}</div>
                    </div>
                    <div className={`additionalContent ${contentShown === WORK ? 'slide-bottom additional fastAnim' : 'o-none'}`}>
                        <div className='additionalContentBG'/>
                        <div><a href='http://www.blockbloc.io/'>BLOCKBLOC</a><div>CONNECTING COMMUNITIES</div></div>
                    </div>
                </div>
            </div>

            <div className='gridColContainer'>
                <div className='gridInnerContainer' onMouseOut={() => setContentShown(null)} onMouseOver={() => contentShown === ABOUT ? null : setContentShown(ABOUT)} >
                    <div className={`about textContainer slide-bottom`} >
                        <div className='text' onMouseOver={() => contentShown === ABOUT ? null : setContentShown(ABOUT)}>{ABOUT}</div>
                    </div>
                    <div className={`additionalContent ${contentShown === ABOUT ? 'slide-bottom additional fastAnim' : 'o-none'}`}>
                        <div className='additionalContentBG'/>
                        <div>CREATING EXPERIENCES</div>
                        <div>FOR THE NEW WEB.</div>
                        <div className='secondaryText'>ENGAGING PLATFORMS</div>
                        <div className='secondaryText'>USABLE AND UNIQUE DESIGNS</div>
                        <div className='secondaryText'>HEAVY DUTY WORK FLOWS</div>
                        <div className='secondaryText'>THE LATEST TECHNOLOGY</div>
                    </div>
                </div>
            </div>


            <div className='gridColContainer'>
                <div className='gridInnerContainer' onMouseOut={() => setContentShown(null)} onMouseOver={() => contentShown === CONTACT ? null : setContentShown(CONTACT)} >
                    <div className={`contact textContainer slide-tl`} >
                        <div className='text' >{CONTACT}</div>
                    </div>
                    <div className={`additionalContent ${contentShown === CONTACT ? 'slide-bottom additional fastAnim' : 'o-none'}`}>
                        <ContactFormFS/>
                        <div className='additionalContentBG'/>
                    </div>
                </div>
            </div>

        </div>
    </StyledLanding>
  )
}
