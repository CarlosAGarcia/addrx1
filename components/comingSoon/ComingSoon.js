import React from 'react'
import StyledLandingPage from './styles/StyledLandingPage.style'
import ParticlesBg from 'particles-bg'

export default function ComingSoon() {

    if (window) {
        return (
            <StyledLandingPage>
                <ParticlesBg type="cobweb" bg={true} />
                <div className='overlay'/>
                <div className='topContainer'>
                    <div className='nameContainer text-shadow-drop-center'>
                        <div className='APart flicker-in-1'>Addr</div><div className='xPart flicker-in-X'>X</div>
                    </div>
                </div>
                <div className='bodyContainer'>
                    <div className='comingSoonContainer fade-in-left'>
                        <div>Coming Q1 2022</div>
                    </div>
                    <div className='mailContainer fade-in-left-delay'>
                        <a href="mailto:thethirdcage@gmail.com">Enquiries</a>
                    </div>
                </div>
            </StyledLandingPage>
        )        
    }
}
