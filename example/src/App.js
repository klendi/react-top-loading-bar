import React, { useEffect, useState, useRef } from 'react'

import { LoadingBar } from 'react-top-loading-bar'
import 'react-top-loading-bar/dist/index.css'
import './index.css'
import { changeColor } from './changeColor'

const App = () => {
  const [progress, setProgress] = useState(0)
  const [barColor, setBarColor] = useState('#f11946')
  const [buttonsColor, setButtonsColor] = useState('red')
  const ref = React.createRef()

  const saveToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      window.alert('Copied To Clipboard')
    })
  }

  return (
    <div>
      <LoadingBar color={barColor} ref={ref} />
      <div className='text-container'>
        <h1 className='header'>react-top-loading-bar</h1>
        <div className='inline'>
          <code
            className='package-install-text'
            onClick={() => saveToClipboard('npm i react-top-loading-bar')}
          >
            npm i react-top-loading-bar
          </code>
          <br />
          or
          <br />
          <code
            className='package-install-text'
            onClick={() => saveToClipboard('yarn add react-top-loading-bar')}
          >
            yarn add react-top-loading-bar
          </code>
        </div>
      </div>
      <div className='buttons-group'>
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
        <br />
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

        <br />
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
        <a
          className={'btn ' + buttonsColor}
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/klendi/react-top-loading-bar/blob/master/example/src/examples/'
        >
          Example
        </a>
        <div className='github-buttons'>
          <a
            className='github-button'
            href='https://github.com/klendi/react-top-loading-bar'
            data-size='large'
            data-show-count='true'
            aria-label='Star klendi/react-top-loading-bar on GitHub'
          >
            Star
          </a>{' '}
          <a
            className='github-button'
            href='https://github.com/klendi'
            data-size='large'
            data-show-count='true'
            aria-label='Follow @klendi on GitHub'
          >
            Follow @klendi
          </a>
        </div>
        <br />
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
