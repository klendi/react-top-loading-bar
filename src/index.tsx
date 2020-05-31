import * as React from 'react'
import {
  CSSProperties,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { useInterval } from './useInterval'
import { randomInt } from './utils'

type IProps = {
  progress: number
  color?: string
  shadow?: boolean
  background?: string
  height?: number
  onLoaderFinished?: Function
  className?: string
  loaderSpeed?: number
  transitionTime?: number
  waitingTime?: number
  onRef?: Function
}

export const LoadingBar = forwardRef(
  (
    {
      progress = 0,
      height = 2,
      className = '',
      color = 'red',
      background = 'transparent',
      onLoaderFinished,
      transitionTime = 300,
      loaderSpeed = 500,
      waitingTime = 1000,
      shadow = true,
    }: IProps,
    ref
  ) => {
    //@ts-ignore
    const [continousInterval, setContinousInterval] = useState<NodeJS.Timeout>()
    const [localProgress, localProgressSet] = useState<number>(0)
    const [pressedContinuous, setPressedContinuous] = useState<{
      active: boolean
      startingValue: number
      refreshRate: number
    }>({ active: false, startingValue: 20, refreshRate: 1000 })

    const initialLoaderStyle: CSSProperties = {
      height: '100%',
      background: color,
      transition: `all ${loaderSpeed}ms ease`,
      width: '0%',
    }

    const loaderContainerStyle: CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      height,
      background,
      zIndex: 99999999999,
      width: 100 + '%',
    }

    const initialShadowStyles: CSSProperties = {
      boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
      width: '5%',
      opacity: 1,
      position: 'absolute',
      height: '100%',
      transition: `all ${loaderSpeed}ms ease`,
      transform: 'rotate(3deg) translate(0px, -4px)',
    }

    const [loaderStyle, loaderStyleSet] = useState<CSSProperties>(
      initialLoaderStyle
    )
    const [shadowStyle, shadowStyleSet] = useState<CSSProperties>(
      initialShadowStyles
    )

    useImperativeHandle(ref, () => ({
      continuousStart(startingValue: number, refreshRate: number = 1000) {
        setPressedContinuous({
          active: true,
          refreshRate,
          startingValue,
        })
      },
      staticStart(startingValue: number = 40) {
        const random = startingValue || randomInt(30, 50)
        localProgressSet(random)
        checkIfFull(localProgress)
      },
      complete() {
        console.log('This pressed')
        localProgressSet(100)
        checkIfFull(100)
      },
    }))

    useEffect(() => {
      if (ref) {
        console.log('We using refs')
        checkIfFull(localProgress)
      } else {
        console.log('We using props')
        checkIfFull(progress)
      }

      return () => {
        if (continousInterval) clearInterval(continousInterval)
      }
    }, [progress])

    const checkIfFull = (_progress: number) => {
      console.log('CHECK IF FULL', _progress)
      if (_progress >= 100) {
        //now it should wait a little bit
        loaderStyleSet({
          ...loaderStyle,
          width: '100%',
        })
        if (shadow) {
          shadowStyleSet({
            ...shadowStyle,
            left: _progress - 5.5 + '%',
          })
        }

        setTimeout(() => {
          //now it can fade out
          loaderStyleSet({
            ...loaderStyle,
            opacity: 0,
            width: '100%',
            transition: `opacity ${transitionTime}ms ease-out`,
          })

          setTimeout(() => {
            //here we wait for it to fade
            if (pressedContinuous.active) {
              setPressedContinuous({
                ...pressedContinuous,
                active: false,
              })
              localProgressSet(0)
              checkIfFull(0)
            }
            if (onLoaderFinished) onLoaderFinished()
          }, transitionTime)
        }, waitingTime)
      } else {
        console.log('Progress in here is ', _progress)
        loaderStyleSet((_loaderStyle) => {
          return {
            ..._loaderStyle,
            width: _progress + '%',
            opacity: 1,
            transition: _progress > 0 ? `all ${loaderSpeed}ms ease` : '',
          }
        })

        if (shadow) {
          shadowStyleSet({
            ...shadowStyle,
            left: _progress - 5.5 + '%',
            transition: _progress > 0 ? `all ${loaderSpeed}ms ease` : '',
          })
        }
      }
    }

    useInterval(
      () => {
        const random = pressedContinuous.startingValue || randomInt(10, 20)

        if (localProgress + random < 90) {
          localProgressSet(localProgress + random)
          checkIfFull(localProgress + random)
        }
      },
      pressedContinuous.active ? pressedContinuous.refreshRate : null
    )

    return (
      <div className={className} style={loaderContainerStyle}>
        <div style={loaderStyle}>
          {shadow ? <div style={shadowStyle} /> : null}
        </div>
      </div>
    )
  }
)
