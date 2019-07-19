import React, { Component } from 'react'

import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    barColor: '#f11946',
    color: 'red'
  }

  randomInt(min, max) {
    var i = (Math.random() * 32768) >>> 0
    return (i % (min - max)) + min
  }

  changeColor = () => {
    const colors = ['red', 'purple', 'green', 'teal', 'orange', 'blue']
    let i = this.randomInt(0, colors.length)

    const color = colors[i]

    let barColor = ''
    switch (color) {
      case 'red':
        barColor = '#f11946'
        break
      case 'purple':
        barColor = '#8800ff'
        break
      case 'green':
        barColor = '#28b485'
        break
      case 'teal':
        barColor = '#00ffe2'
        break
      case 'orange':
        barColor = '#ff7c05'
        break
      case 'blue':
        barColor = '#2998ff'
        break

      default:
        break
    }
    this.setState({ barColor, color })
  }

  render() {
    return (
      <div>
        <LoadingBar
          color={this.state.barColor}
          onRef={ref => (this.LoadingBar = ref)}
        />
        <div className='text-container'>
          <h1 className='header'>react-top-loading-bar</h1>
          <div className='inline'>
            <h3 className='package-install-text'>
              npm i react-top-loading-bar
            </h3>
            <br />
            or
            <br />
            <h3 className='package-install-text'>
              yarn add react-top-loading-bar
            </h3>
          </div>
        </div>
        <div className='buttons-group'>
          <button
            className={'btn ' + this.state.color}
            onClick={() => this.LoadingBar.continousStart()}
          >
            Start Continous Loading Bar
          </button>
          <button
            className={'btn ' + this.state.color}
            onClick={() => this.LoadingBar.staticStart()}
          >
            Start Static Loading Bar
          </button>
          <button
            className={'btn ' + this.state.color}
            onClick={() => this.LoadingBar.complete()}
          >
            Complete
          </button>
          <br />
          <button
            className={'btn ' + this.state.color}
            onClick={() => this.LoadingBar.add(10)}
          >
            Add 10%
          </button>
          <button
            className={'btn ' + this.state.color}
            onClick={() => this.LoadingBar.add(30)}
          >
            Add 30%
          </button>
          <button
            className={'btn ' + this.state.color}
            onClick={() => this.LoadingBar.add(50)}
          >
            Add 50%
          </button>

          <br />
          <button
            className={'btn ' + this.state.color}
            onClick={() => this.changeColor()}
          >
            Change Color
          </button>
          <a
            className={'btn ' + this.state.color}
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
              href='https://klendi.me'
              style={{ color: this.state.barColor }}
              target='_blank'
            >
              Klendi Gocci
            </a>
          </div>
        </div>
      </div>
    )
  }
}
