import React, { useEffect, useState } from 'react'
import { useStore } from '../../stores/threeStore'
import StyledLanding from './styles/StyledLanding.style.js'

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
    const [ contentShown, setContentShown ] = useState(null)

  return (
    <StyledLanding>
        <div className={`${isInit ? 'loadIn navBarContainer' : 'd-none'}`}>
            <div>
                <div className={`work text slide-tr`} onMouseOut={() => setContentShown(null)}>{WORK}</div>
                <div>
                </div>
            </div>
            <div>

            <div className={`about text slide-bottom`} onMouseOut={() => setContentShown(null)}>{ABOUT}</div>
            </div>

            <div>

            <div className={`contact text slide-tl`} onMouseOut={() => setContentShown(null)}>{CONTACT}</div>
            </div>

        </div>
    </StyledLanding>
  )
}
