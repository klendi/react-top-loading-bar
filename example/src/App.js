import React, { useEffect, useState, useRef } from 'react'

import { LoadingBar } from 'react-top-loading-bar'
import 'react-top-loading-bar/dist/index.css'

const App = () => {
  const [progress2, setProgress] = useState(0)
  const refContainer = useRef(null)

  return (
    <div>
      <LoadingBar
        progress={progress2}
        shadow={true}
        ref={refContainer}
        onLoaderFinished={() => setProgress(0)}
      />
      {console.log('REf container is', refContainer)}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setProgress(progress2 + 50)}>Increase</button>
      <button onClick={() => setProgress(progress2 - 10)}>Decrease</button>
      <h1>Hello world</h1>
    </div>
  )
}

export default App
