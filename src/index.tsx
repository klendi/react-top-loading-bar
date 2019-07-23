import React, { Component } from 'react'
import PropTypes from 'prop-types'

// @ts-ignore
import styles from './styles.css'

type IState = {
  show: boolean
  full: boolean
  progress: number
  wait: boolean
}

type IProps = {
  progress?: number
  color?: string
  background?: string
  height?: number
  onLoaderFinished?: Function
  onProgressChange?: Function
  className?: string
  onRef?: Function
}

class LoadingBar extends Component<IProps, IState> {
  state = {
    show: true,
    full: false,
    progress: 0,
    wait: false
  }
  static propTypes = {
    progress: PropTypes.number,
    color: PropTypes.string,
    background: PropTypes.string,
    height: PropTypes.number,
    onLoaderFinished: PropTypes.func,
    onProgressChange: PropTypes.func,
    className: PropTypes.string,
    onRef: PropTypes.func
  }

  static defaultProps = {
    progress: 0,
    color: '#f11946',
    height: 3,
    className: '',
    background: ''
  }

  private mounted: boolean

  public add = (value: number) => {
    this.setState({ progress: this.state.progress + value }, () => {
      this.onProgressChange()
    })
  }

  private onProgressChange = () => {
    if (this.props.onProgressChange)
      this.props.onProgressChange(this.state.progress)

    this.checkIfFull()
  }

  public decrease = (value: number) => {
    this.setState({ progress: this.state.progress - value }, () => {
      this.onProgressChange()
    })
  }

  private randomInt(low: number, high: number) {
    return Math.floor(Math.random() * (high - low) + low)
  }

  public continousStart = (startingValue: number) => {
    const random = startingValue || this.randomInt(20, 30)
    this.setState({ progress: random })

    const interval = setInterval(() => {
      if (this.state.progress < 90) {
        const random = this.randomInt(2, 10)
        if (!this.mounted) return false
        this.setState({ progress: this.state.progress + random }, () => {
          this.onProgressChange()
        })
      } else {
        clearInterval(interval)
      }
    }, 1000)
  }

  public staticStart = (startingValue: number) => {
    const random = startingValue || this.randomInt(30, 50)

    this.setState({ progress: random }, () => {
      this.onProgressChange()
    })
  }

  public complete = () => {
    this.setState({ progress: 100 }, () => {
      this.onProgressChange()
    })
  }

  private onLoaderFinished = () => {
    if (this.props.onLoaderFinished) this.props.onLoaderFinished()

    this.setState({ progress: 0 }, () => {
      this.onProgressChange()
    })
  }

  render() {
    const { className, height } = this.props
    const { show, full } = this.state
    return (
      <div style={{ height }}>
        {show ? (
          <div
            className={
              styles['loading-bar'] +
              ' ' +
              (className || '') +
              ' ' +
              (full ? styles['loading-bar-full'] : '')
            }
            style={this.barStyle()}
          />
        ) : null}
      </div>
    )
  }

  componentWillReceiveProps(nextProps: IProps) {
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
    this.mounted = true
    if (this.props.onRef) this.props.onRef(this)

    if (this.state.progress !== this.props.progress) {
      this.setState({ progress: this.props.progress })
    }
  }
  componentWillUnmount() {
    this.mounted = false
    if (this.props.onRef) this.props.onRef(undefined)
  }
  // Check whether the progress is full
  private checkIfFull = () => {
    if (!this.mounted) return false

    if (this.state.progress >= 100) {
      // Prevent new progress change
      this.setState({ wait: true })

      // Start animate it
      setTimeout(() => {
        if (!this.mounted) return false
        // animate when element removed
        this.setState({
          full: true
        })

        setTimeout(() => {
          if (!this.mounted) return false
          this.setState({
            // remove bar element
            show: false,
            progress: 0,
            wait: false
          })

          setTimeout(() => {
            if (!this.mounted) return false
            this.setState({
              // Show Bar
              full: false,
              show: true
            })
            this.onLoaderFinished()
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
    const { color, background } = this.props

    if (!this.state.wait) {
      return {
        width: `${this.state.progress}%`,
        backgroundColor: color,
        background: background
      }
    } else {
      return { width: '100%', backgroundColor: color, background }
    }
  }
}

export default LoadingBar
