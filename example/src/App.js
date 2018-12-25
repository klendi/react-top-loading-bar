import React, { Component } from 'react'

import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    loadingBarProgress: 10,
    barColor: '#f11946',
    color: 'red'

  }

  add = value => {
    this.setState({loadingBarProgress: this.state.loadingBarProgress + value})
  }

  complete = () => {
    this.setState({loadingBarProgress: 100})
  }

  onLoaderFinished = () => {
    this.setState({loadingBarProgress: 0})
  }

  changeColor = () => {
    const colors = ['red', 'purple', 'green', 'teal', 'orange', 'blue']
    let i = Math.floor(Math.random() * (colors.length))
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

    this.setState({barColor})
    this.setState({color})
  }

  render () {
    return (
      <div>
        <LoadingBar
          progress={this.state.loadingBarProgress}
          height={3}
          color={this.state.color}
          onLoaderFinished={() => this.onLoaderFinished()}
        />
        <div className='text-container'>
          <h1 className='header'>react-top-loading-bar</h1>
          <div className='inline'>
            <h3 className='package-install-text'>npm i react-top-loading-bar --save</h3>
            <br />
            or
            <br />
            <h3 className='package-install-text'>yarn add react-top-loading-bar</h3>
          </div>
        </div>
        <div className='buttons-group'>
          <button className={'btn ' + this.state.color} onClick={() => this.add(10)}>Add 10%</button>
          <button className={'btn ' + this.state.color} onClick={() => this.add(30)}>Add 30%</button>
          <button className={'btn ' + this.state.color} onClick={() => this.complete()}>Complete</button>
          <br />
          <button className={'btn ' + this.state.color} onClick={() => this.changeColor()}>Change Color</button>
          <a className={'btn ' + this.state.color} target='_blank' href='https://github.com/klendi/react-top-loading-bar/blob/master/example/src/App.js'>Example</a>
          <div className='github-buttons'>
            <a className='github-button' href='https://github.com/klendi/react-top-loading-bar' data-size='large' data-show-count='true' aria-label='Star klendi/react-top-loading-bar on GitHub'>Star</a>
            {' '}
            <a className='github-button' href='https://github.com/klendi' data-size='large' data-show-count='true' aria-label='Follow @klendi on GitHub'>Follow @klendi</a>
          </div>
        </div>
      </div>
    )
  }
}
