import React, { useEffect, useState, useRef } from 'react'

import LoadingBar from 'react-top-loading-bar'
import './index.css'
import { changeColor } from './changeColor'
import Highlight from 'react-highlight'


const App = () => {
  const [progress, setProgress] = useState(0)
  const [barColor, setBarColor] = useState('#f11946')
  const [buttonsColor, setButtonsColor] = useState('red')
  const ref = useRef(null)
  const [usingRef, setUsingRef] = useState(false)

  const saveToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      window.alert('Copied To Clipboard')
    })
  }

  const changeMode = refMode => {
    if(refMode) {
      setProgress(0)
    }

    setUsingRef(refMode)
  }

  return (
    <div>
      {usingRef ? <LoadingBar color={barColor} ref={ref} shadow={true}/> :
        <LoadingBar color={barColor} progress={progress} onLoaderFinished={() => setProgress(0)}/>}

      <div className='text-container'>
        <h1 className='header'>react-top-loading-bar</h1>
        <div className='inline'>
          <code
            className='package-install-text'
            onClick={() => saveToClipboard('npm i react-top-loading-bar')}
          >
            npm i react-top-loading-bar
          </code>
          <br/>
          or
          <br/>
          <code
            className='package-install-text'
            onClick={() => saveToClipboard('yarn add react-top-loading-bar')}
          >
            yarn add react-top-loading-bar
          </code>
        </div>
      </div>
      <div className='buttons-group'>
        <Highlight language="javascript" className="code-highlighter">
          {usingRef ? `const ref = useRef(null);\n<LoadingBar color={barColor} ref={ref} />\nref.current.continuousStart()` : `const [progress,setProgress] = useState(0);\n<LoadingBar color={barColor} progress={progress}
    onLoaderFinished={() => setProgress(0)} />`}
        </Highlight>
        <br/>
        {usingRef ? <div>
            <button
              className={'btn ' + buttonsColor}
              onClick={() => ref.current.continuousStart()}
            >
              Start Continuous Loading Bar
            </button>
            <button
              className={'btn ' + buttonsColor}
              onClick={() => ref.current.staticStart()}
            >
              Start Static Loading Bar
            </button>
            <button
              className={'btn ' + buttonsColor}
              onClick={() => ref.current.complete()}
            >
              Complete
            </button>
            <br/>
          </div> :
          <div>

            <button
              className={'btn ' + buttonsColor}
              onClick={() => setProgress(progress + 10)}
            >
              Add 10%
            </button>
            <button
              className={'btn ' + buttonsColor}
              onClick={() => setProgress(progress + 30)}
            >
              Add 30%
            </button>
            <button
              className={'btn ' + buttonsColor}
              onClick={() => setProgress(progress + 50)}
            >
              Add 50%
            </button>

            <br/>
          </div>
        }

        <button
          className={'btn ' + buttonsColor}
          onClick={() => {
            const colors = changeColor(buttonsColor)
            setBarColor(colors.barColor)
            setButtonsColor(colors.color)
          }}
        >
          Change Color
        </button>
        <button
          className={'btn ' + buttonsColor}
          onClick={() => changeMode(!usingRef)}
        >
          Change to {usingRef ? 'State' : 'Refs'} Mode
        </button>
        <a
          className={'btn ' + buttonsColor}
          target='_blank'
          rel='noopener noreferrer'
          href={ usingRef ? 'https://github.com/klendi/react-top-loading-bar/blob/master/example/src/examples/exampleWithRef.js' : 'https://github.com/klendi/react-top-loading-bar/blob/master/example/src/examples/exampleWithState.js'}
        >
          Example
        </a>
        <br/>
        <br/>
        <div className='github-buttons'>
          <a className="github-button" href="https://github.com/klendi/react-top-loading-bar"
             data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large"
             data-show-count="true" aria-label="Star klendi/react-top-loading-bar on GitHub">Star</a>{' '}
          <a className="github-button" href="https://github.com/klendi"
             data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large"
             data-show-count="true" aria-label="Follow @klendi on GitHub">Follow @klendi</a>
        </div>
        <br/>
        <div>
          Made with ❤️ by{' '}
          <a
            href='https://klendi.dev'
            style={{ color: barColor }}
            target='_blank'
          >
            Klendi Gocci
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
