import * as React from 'react'
import { CSSProperties, useEffect, useState } from 'react'

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
}

export const LoadingBar = ({
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
}: IProps) => {
  const initialLoaderStyle: CSSProperties = {
    height: '100%',
    background: color,
    transition: `all ${loaderSpeed}ms ease`,
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
  const [loaderStyle, loaderStyleSet] = useState(initialLoaderStyle)
  const [shadowStyle, shadowStyleSet] = useState(initialShadowStyles)

  const checkIfFull = () => {
    if (progress >= 100) {
      //now it should wait a little bit
      loaderStyleSet({
        ...loaderStyle,
        width: '100%',
      })
      shadowStyleSet({
        ...shadowStyle,
        left: progress - 5.5 + '%',
      })

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
          if (onLoaderFinished) onLoaderFinished()
        }, transitionTime)
      }, waitingTime)
    } else {
      loaderStyleSet({
        ...loaderStyle,
        width: progress + '%',
        opacity: 1,
        transition: progress > 0 ? `all ${loaderSpeed}ms ease` : '',
      })

      shadowStyleSet({
        ...shadowStyle,
        left: progress - 5.5 + '%',
        transition: progress > 0 ? `all ${loaderSpeed}ms ease` : '',
      })
    }
  }

  useEffect(() => {
    checkIfFull()
  }, [progress])

  return (
    <div className={className} style={loaderContainerStyle}>
      <div style={loaderStyle}>
        {shadow ? <div style={shadowStyle} /> : null}
      </div>
    </div>
  )
}
