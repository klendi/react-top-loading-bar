# react-top-loading-bar

>

[![NPM](https://img.shields.io/npm/v/react-top-loading-bar.svg)](https://www.npmjs.com/package/react-top-loading-bar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm download][download-image]][download-url]

[download-image]: https://img.shields.io/npm/dm/react-top-loading-bar.svg
[download-url]: https://npmjs.org/package/react-top-loading-bar

[![react-top-loading-bar](https://nodei.co/npm/react-top-loading-bar.png)](https://npmjs.org/package/react-top-loading-bar)

## Install

- using npm

```bash
npm install --save react-top-loading-bar
```

- using yarn

```bash
yarn add react-top-loading-bar
```

## Usage

### With react ref (useful with functional components or whenever you don't want to use a state, also with ref you can access have some built in methods)

```jsx
import React, { Component } from 'react'

import LoadingBar from 'react-top-loading-bar'

export default class ExampleWithRefs extends Component {
  startFetch = () => {
    this.LoadingBar.startContinous()
  }

  onFinishFetch = () => {
    this.LoadingBar.complete()
  }

  render() {
    return (
      <div>
        <LoadingBar
          height={3}
          color="#f11946"
          onRef={ref => (this.LoadingBar = ref)}
        />
        <button onClick={() => this.LoadingBar.continousStart()}>
          Start Continous Bar Loading
        </button>
        <button onClick={() => this.LoadingBar.staticStart()}>
          Start Static Bar Loading
        </button>
        <button onClick={() => this.LoadingBar.complete()}>Complete</button>
        <br />
        <button onClick={() => this.LoadingBar.add(10)}>Add 10</button>
        <button onClick={() => this.LoadingBar.add(10)}>Add 30</button>
      </div>
    )
  }
}
```

### with local state

```jsx
import React, { Component } from 'react'

import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    loadingBarProgress: 0
  }

  add = value => {
    this.setState({
      loadingBarProgress: this.state.loadingBarProgress + value
    })
  }

  complete = () => {
    this.setState({ loadingBarProgress: 100 })
  }

  onLoaderFinished = () => {
    this.setState({ loadingBarProgress: 0 })
  }

  render() {
    return (
      <div>
        <LoadingBar
          progress={this.state.loadingBarProgress}
          height={3}
          color="red"
          onLoaderFinished={() => this.onLoaderFinished()}
        />
        <button onClick={() => this.add(10)}>Add 10</button>
        <button onClick={() => this.add(30)}>Add 30</button>
        <button onClick={() => this.complete()}>Complete</button>
      </div>
    )
  }
}
```

## Demo

[Click here for demo](https://klendi.github.io/react-top-loading-bar/)

## Properties

| Property         | Type     | Default | Description                                                                                                                             |
| :--------------- | :------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| progress         | Number   | `0`     | The progress/width indicator, progress prop varies from `0` to `100`.                                                                   |
| color            | String   | `red`   | The color of the loading bar, color take values like css property `background-color:` do, for example `red`, `#000` `rgb(255,0,0)` etc. |
| height           | Number   | `3`     | The height of the loading bar in pixels.                                                                                                |
| className        | String   |         | You can provide a class you'd like to add to the loading bar to add some styles to it                                                   |
| onLoaderFinished | Function |         | This is called when the loading bar completes, reaches 100% of his width.                                                               |
| onProgressChange | Function |         | This is called each time loading bar value changes.                                                                                     |

## Code Style

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

## License

MIT © [Klendi Gocci](https://github.com/klendi)
