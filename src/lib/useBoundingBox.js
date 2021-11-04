import { useState, useRef, useEffect } from 'react'

const useBoundingBox = () => {
  const ref = useRef()
  const [bbox, setBbox] = useState({})

  const set = () =>
    setBbox(ref && ref.current ? ref.current.getBoundingClientRect() : {})

  useEffect(() => {
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])

  return [bbox, ref]
}

export default useBoundingBox
