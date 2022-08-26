import React, { useEffect } from 'react'
import { useStore } from '../../stores/threeStore'

export default function Landing() {
    const init = useStore(state => state.init)
    const { totalAnimationTime, isInit } = useStore(state => state)
    console.log({ totalAnimationTime, isInit })
    useEffect(() => {
        init()
        // animate()
    }, [ init ])

  return (
    <div>Landing</div>
  )
}
