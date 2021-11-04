import './App.css';
import { useState } from 'react'

import * as deviceOrientationDriver from './lib/deviceOrientationDriver'
import Demo from './Demo'

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  const startButtonStyles = {
    cursor: 'pointer',
    height: '100vh',
    width: '100vw',
    fontSize: '24pt',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'underline',
  }

  const handleStart = deviceOrientationDriver.carryAPIAllowed(
    () => setIsInitialized(true),
  )

  return (
    <div className="App">
      {isInitialized
        ? <Demo />
        : (
          <div
            style={startButtonStyles}
            onClick={handleStart}
          >
            <span>Start</span>
          </div>
        )
      }
    </div>
  );
}

export default App;
