# react-top-loading-bar

> 

[![NPM](https://img.shields.io/npm/v/react-top-loading-bar.svg)](https://www.npmjs.com/package/react-top-loading-bar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-top-loading-bar
```

## Usage

```jsx
import React, { Component } from 'react'

import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    loadingBarProgress: 0
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

  render () {
    return (
      <div>
        <LoadingBar
          progress={this.state.loadingBarProgress}
          height={3}
          color='red'
          onLoaderFinished={() => this.onLoaderFinished}
        />
        <button onClick={() => this.add(10)}>Add 10</button>
        <button onClick={() => this.add(30)}>Add 30</button>
        <button onClick={() => this.complete()}>Complete</button>
      </div>
    )
  }
}

```

## License

MIT © [klendi](https://github.com/klendi)
