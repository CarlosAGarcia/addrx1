import React, { useEffect } from 'react'
import { useStore } from '../../stores/threeStore'

export default function Landing() {
    const init = useStore(state => state.init)
    // const animate = useStore(state => state.animate)

    useEffect(() => {
        init()
        // animate()
    }, [ init ])

  return (
    <div>Landing</div>
  )
}
