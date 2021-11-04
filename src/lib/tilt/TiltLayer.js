import React, { useContext } from 'react'

import { TiltContext } from './Tilt'

const TiltLayer = ({
  distance,
  children,
  noZoom = false,
}) => {
  const state = useContext(TiltContext) || {}
  const {
    localOffset,
    tiltBoundingBox,
    perspectiveDepth,
  } = state

  const paddingOrigin = Math.min(tiltBoundingBox.height, tiltBoundingBox.width)
  const addedScale = distance * perspectiveDepth / 100 // 10% to 0.1 format
  const paddingSize = paddingOrigin * addedScale / 2

  const sliderStyles = {
    position: 'absolute',
    left: localOffset[0] * paddingSize / (perspectiveDepth / 2) || 0,
    top: localOffset[1] * paddingSize / (perspectiveDepth / 2) || 0,
    width: '100%',
    height: '100%',
    zIndex: 333 - distance,
  }

  const zoomerStyles = {
    height: '100%',
    transform: noZoom ? '' : `scale(${1 + addedScale})`,
  }

  return (
    <div className="tilt-layer-slider" style={sliderStyles}>
      <div className="tilt-layer-zoomer" style={zoomerStyles}>
        {children}
      </div>
    </div>
  )
}

export default TiltLayer
