import { useEffect } from 'react'
import * as driver from './deviceOrientationDriver'

const useSubscribeDeviceOrientation = (
  callback,
  dependencies = [],
) => useEffect(() => {
  driver.subscribe(callback)
  return () => driver.unsubscribe(callback)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [callback, ...dependencies])

export default useSubscribeDeviceOrientation
