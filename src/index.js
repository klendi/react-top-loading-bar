import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

class LoadingBar extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    show: true,
    full: false,
    progress: 0,
    wait: false
  }

  render() {
    const { className } = this.props
    const { show, full } = this.state

    return (
      <div>
        {show ? (
          <div
            className={
              styles['loading-bar'] +
              (className || '') +
              (full ? styles['loading-bar-full'] : '')
            }
            style={this.barStyle()}
          />
        ) : null}
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    // Watching Progress Changes
    if (nextProps.progress !== this.props.progress) {
      this.setState({ progress: nextProps.progress }, () => {
        if (this.props.onProgressChange != null) {
          this.props.onProgressChange()
        }
        this.checkIfFull()
      })
    }
  }

  componentDidMount() {
    if (this.state.progress !== this.props.progress) {
      this.setState({progress: this.props.progress})
    }
  }

  // Check whether the proggress is full
  checkIfFull = () => {
    if (this.state.progress >= 100) {
      // Prevent new progress change
      this.setState({ wait: true })

      // Start animate it
      setTimeout(() => {
        // animate when element removed
        this.setState({
          full: true,
          myError: false
        })

        setTimeout(() => {
          this.setState({
            // remove bar element
            show: false,
            progress: 0,
            wait: false
          })

          setTimeout(() => {
            this.setState({
              // Show Bar
              full: false,
              show: true
            })

            this.props.onLoaderFinished()
          })

          // Duration to Waiting for hiding animation
        }, 250)

        // Duration is depend on css animation-duration of loading-bar
      }, 700)
    }
  }

  // apply width style to our element as inline style
  barStyle() {
    // When loading bar still in progress
    const { color, height } = this.props

    if (!this.state.wait) {
      return {
        width: `${this.state.progress}%`,
        backgroundColor: color,
        height: height
      }
    } else {
      return { width: '100%', backgroundColor: color }
    }
  }
}

LoadingBar.propTypes = {
  progress: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.number,
  onLoaderFinished: PropTypes.func,
  onProgressChange: PropTypes.func,
  className: PropTypes.string
}

export default LoadingBar
