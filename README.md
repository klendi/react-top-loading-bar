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

### Using hooks

```jsx
import { useLoadingBar } from "react-top-loading-bar";

const App = () => {
  const { start, complete } = useLoadingBar({
    color: "blue",
    height: 2,
  });

  return (
    <div>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => complete()}>Complete</button>
    </div>
  );
};
```

#### Wrap the app with LoadingBarContainer

```jsx
import { LoadingBarContainer } from "react-top-loading-bar";

const Parent = () => {
  return (
    <LoadingBarContainer>
      <App />
    </LoadingBarContainer>
  );
};
```

### With ref

```jsx
import { useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

const App = () => {
  // prettier-ignore
  const ref = useRef<LoadingBarRef>(null);

  return (
    <div>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      <button onClick={() => ref.current?.continuousStart()}>
        Start Continuous Loading Bar
      </button>
      <button onClick={() => ref.current?.staticStart()}>
        Start Static Loading Bar
      </button>
      <button onClick={() => ref.current?.complete()}>Complete</button>
    </div>
  );
};
```

### With state

```jsx
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <button onClick={() => setProgress(progress + 10)}>Add 10%</button>
      <button onClick={() => setProgress(progress + 20)}>Add 20%</button>
      <button onClick={() => setProgress(100)}>Complete</button>
    </div>
  );
};
```

## Demo

[Click here for demo](https://klendi.github.io/react-top-loading-bar/)

## Built-in Methods

| Methods                                     |             Parameters              | Descriptions                                                                                                                                                                                                                |
| ------------------------------------------- | :---------------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| start(loaderType?)                          | `continuous` (default) or `static`  | Starts the loading indicator. If type is "static" it will start the static bar otherwise it will start the animated continuous bar.                                                                                         |
| continuousStart(startingValue, refreshRate) | Number (optional), Number(optional) | Starts the loading indicator with a random starting value between 20-30, then repetitively after an refreshRate, increases it by a random value between 2-10. This continues until it reaches 90% of the indicator's width. |
| staticStart(startingValue)                  |          Number (optional)          | Starts the loading indicator with a random starting value between 30-50.                                                                                                                                                    |
| complete()                                  |                                     | Makes the loading indicator reach 100% of his width and then fade.                                                                                                                                                          |
| increase(value)                             |               Number                | Adds a value to the loading indicator.                                                                                                                                                                                      |
| decrease(value)                             |               Number                | Decreases a value to the loading indicator.                                                                                                                                                                                 |
| getProgress()                               |                                     | Get the current progress value.                                                                                                                                                                                             |

## Properties

| Property           | Type          | Default       | Description                                                                                                                       |
| :----------------- | :------------ | :------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| progress           | Number        | `0`           | The progress/width indicator, progress prop varies from `0` to `100`.                                                             |
| color              | String        | `red`         | The color of the loading bar, color take values like css property `background:` do, for example `red`, `#000` `rgb(255,0,0)` etc. |
| shadow             | Boolean       | `true`        | Enables / Disables shadow underneath the loader.                                                                                  |
| height             | Number        | `2`           | The height of the loading bar in pixels.                                                                                          |
| background         | String        | `transparent` | The loader parent background color.                                                                                               |
| style              | CSSProperties |               | The style attribute to loader's div                                                                                               |
| containerStyle     | CSSProperties |               | The style attribute to loader's container                                                                                         |
| shadowStyle        | CSSProperties |               | The style attribute to loader's shadow                                                                                            |
| transitionTime     | Number        | `300`         | Fade transition time in miliseconds.                                                                                              |
| loaderSpeed        | Number        | `500`         | Loader transition speed in miliseconds.                                                                                           |
| waitingTime        | Number        | `1000`        | The delay we wait when bar reaches 100% before we proceed fading the loader out.                                                  |
| className          | String        |               | You can provide a class you'd like to add to the loading bar to add some styles to it                                             |
| containerClassName | String        |               | You can provide a class you'd like to add to the loading bar container to add some css styles                                     |
| onLoaderFinished   | Function      |               | This is called when the loading bar completes, reaches 100% of his width.                                                         |

## Migrate from V.1

- Replace onRef prop with 'ref', assign it to a react ref. Access methods with reactRef.current.xxx

## Migrate from V.2

- Replace ref.current.continuousStart() with ref.current?.start()
- Replace ref.current.staticStart() with ref.current?.start("static")

## License

MIT © [Klendi Goci](https://klendi.dev) | [klendi.dev](https://klendi.dev) | GitHub [@klendi](https://github.com/klendi)
