import { useState, useEffect, createContext } from 'react'

import useBoundingBox from '../useBoundingBox'
import useSubscribeDeviceOrientation from '../useSubscribeDeviceOrientation'

export const TiltContext = createContext();

const subtractOrientations = (oA, oB) => ({
  alpha: oA.alpha - oB.alpha, // responsible for X
  beta: oA.beta - oB.beta,    // responsible for Y
})

// local offset -- is a [x, y] tuple
// both x and y are decimal representations of offset percent

const tiltToLocalOffset = ({ alpha, beta }, density) => {
  return [
    (-alpha / 90) * (1 / density),
    (-beta / 90) * (1 / density),
  ]
}

const limitLocalOffset = ([x, y]) => [
  Math.min(1, Math.max(-1, x)),
  Math.min(1, Math.max(-1, y)),
]

// perspective depth is...
// how much would your layer scale per distance
const DEFAULT_PERSPECTIVE_DEPTH = 10

// density is...
// how much should you rotate phone to reach layer end,
// value range is [0..1] where
// 0 is no moving,
// 0.00001 is kinda extremely small distance,
// 1 is 90deg rotation
const DEFAULT_LAYER_DENSITY = 0.5

const Tilt = ({
  children,
  perspectiveDepth = DEFAULT_PERSPECTIVE_DEPTH,
  density = DEFAULT_LAYER_DENSITY
}) => {
  const [tiltBoundingBox, tiltRef] = useBoundingBox()
  const [currentOrientation, setCurrentOrientation] = useState(null)
  const [initialOrientation, setInitialOrientation] = useState(null)

  const saveOrientation = initialOrientation
    ? setCurrentOrientation
    : setInitialOrientation

  const handleOrientation = (event) => {
    const { alpha, beta, gamma } = event
    saveOrientation({ alpha: gamma, beta })
  }

  useSubscribeDeviceOrientation(handleOrientation)

  const tiltOffset = currentOrientation && initialOrientation
    ? subtractOrientations(currentOrientation, initialOrientation)
    : { alpha: 0, beta: 0 }

  const localOffset = limitLocalOffset(
    tiltToLocalOffset(tiltOffset, density)
  )

  const tiltState = {
    localOffset,
    tiltBoundingBox,
    perspectiveDepth,
    density,
  }

  const tiltContainerStyles = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }

  return (
    <TiltContext.Provider value={tiltState}>
      <div ref={tiltRef} style={tiltContainerStyles} >
        {children}
      </div>
    </TiltContext.Provider>
  )
}

export default Tilt
