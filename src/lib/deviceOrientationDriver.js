const deviceOrientationAPIEnabled = Boolean(DeviceOrientationEvent)
const deviceOrientationPermissionRequired = typeof DeviceOrientationEvent?.requestPermission === 'function'

const carryAPIEnabled = action => (...params) => deviceOrientationAPIEnabled
  ? action(...params)
  : Promise.reject(new Error('Device orientation API is not available'))


export const requestPermission = carryAPIEnabled(
  () => deviceOrientationPermissionRequired
    ? DeviceOrientationEvent.requestPermission()
    : Promise.resolve('granted')
)

export const carryAPIAllowed = action => (...params) => requestPermission()
  .then(response => {
    if (response === 'granted') {
      return action(...params)
    } else {
      throw new Error('Device orientation API is rejected by user')
    }
  })
  .catch(console.error)

export const subscribe = carryAPIAllowed(
  callback => window.addEventListener('deviceorientation', callback),
)

export const unsubscribe = carryAPIAllowed(
  callback => window.removeEventListener('deviceorientation', callback),
)
