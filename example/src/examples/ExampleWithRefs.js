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
        <LoadingBar onRef={ref => (this.LoadingBar = ref)} />

        <button onClick={() => this.LoadingBar.continousStart()}>
          Start Continous Bar
        </button>
        <button onClick={() => this.LoadingBar.staticStart()}>
          Start Static Bar
        </button>
        <button onClick={() => this.LoadingBar.complete()}>Complete</button>
        <br />
        <button onClick={() => this.LoadingBar.add(10)}>Add 10</button>
        <button onClick={() => this.LoadingBar.add(10)}>Add 30</button>
      </div>
    )
  }
}
