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

- CDN

```
https://unpkg.com/react-top-loading-bar
```

## Usage

### With ref

```jsx
import React, { Component } from 'react';

import LoadingBar from 'react-top-loading-bar';

export default class ExampleWithRefs extends Component {
  render() {
    return (
      <div>
        <LoadingBar
          height={3}
          color='#f11946'
          onRef={ref => (this.LoadingBar = ref)}
        />
        <button onClick={() => this.LoadingBar.continuousStart()}>
          Start Continuous Bar Loading
        </button>
        <button onClick={() => this.LoadingBar.staticStart()}>
          Start Static Bar Loading
        </button>
        <button onClick={() => this.LoadingBar.complete()}>Complete</button>
        <br />
        <button onClick={() => this.LoadingBar.add(10)}>Add 10</button>
        <button onClick={() => this.LoadingBar.add(10)}>Add 30</button>
      </div>
    );
  }
}
```

### With state

```jsx
import React, { Component } from 'react';

import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state = {
    loadingBarProgress: 0
  };

  add = value => {
    this.setState({
      loadingBarProgress: this.state.loadingBarProgress + value
    });
  };

  complete = () => {
    this.setState({ loadingBarProgress: 100 });
  };

  onLoaderFinished = () => {
    this.setState({ loadingBarProgress: 0 });
  };

  render() {
    return (
      <div>
        <LoadingBar
          progress={this.state.loadingBarProgress}
          height={3}
          color='red'
          onLoaderFinished={() => this.onLoaderFinished()}
        />
        <button onClick={() => this.add(10)}>Add 10</button>
        <button onClick={() => this.add(30)}>Add 30</button>
        <button onClick={() => this.complete()}>Complete</button>
      </div>
    );
  }
}
```

## Demo

[Click here for demo](https://klendi.github.io/react-top-loading-bar/)

## Built-in Methods

| Methods                       |    Parameters     | Descriptions                                                                                                                                                                                                                  |
| ----------------------------- | :---------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| add(value)                    |      Number       | Adds a value to the loading indicator.                                                                                                                                                                                        |
| decrease(value)               |      Number       | Decreases a value to the loading indicator.                                                                                                                                                                                   |
| continousStart(startingValue) [typo - deprecated, use continuousStart] | Number (optional) | Starts the loading indicator with a random starting value between 20-30, then repetitively after an interval of 1s increases it by a random value between 2-10. This continues until it reaches 90% of the indicator's width. |
| continuousStart(startingValue) | Number (optional) | Starts the loading indicator with a random starting value between 20-30, then repetitively after an interval of 1s increases it by a random value between 2-10. This continues until it reaches 90% of the indicator's width. |
| staticStart(startingValue)    | Number (optional) | Starts the loading indicator with a random starting value between 30-50.                                                                                                                                                      |
| complete()                    |                   | Makes the loading indicator reach 100% of his width and then fade.                                                                                                                                                            |

## Properties

| Property               | Type     | Default | Description                                                                                                                                    |
| :--------------------- | :------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| progress               | Number   | `0`     | The progress/width indicator, progress prop varies from `0` to `100`.                                                                          |
| color                  | String   | `red`   | The color of the loading bar, color take values like css property `background:` do, for example `red`, `#000` `rgb(255,0,0)` etc.              |
| background(depreacted) | String   |         | (Please use color since it now haves the same functionality) The `background` css property of the bar. Can be used for gradients, images, etc. |
| height                 | Number   | `3`     | The height of the loading bar in pixels.                                                                                                       |
| className              | String   |         | You can provide a class you'd like to add to the loading bar to add some styles to it                                                          |
| onLoaderFinished       | Function |         | This is called when the loading bar completes, reaches 100% of his width.                                                                      |
| onProgressChange       | Function |         | This is called each time loading bar value changes.                                                                                            |
| onRef                  | Function |         | This is used to access built in methods                                                                                                        |

## Projects using react-top-loading-bar

- [React Movies](https://github.com/klendi/react-movies)
- [WCYB](https://github.com/klendi/wcyb)

Add your own project. Make a PR

## Code Style

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

## License

MIT © [Klendi Gocci](https://klendi.me) | klendi.me
