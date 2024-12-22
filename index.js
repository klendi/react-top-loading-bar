'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

// src/index.tsx
var noop = () => {
};
function useInterval(callback, delay, immediate) {
  const savedCallback = React.useRef(noop);
  React.useEffect(() => {
    savedCallback.current = callback;
  });
  React.useEffect(() => {
    return;
  }, [immediate]);
  React.useEffect(() => {
    if (delay === null || delay === false) return void 0;
    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

// src/utils.ts
function randomValue(min, max) {
  return Math.random() * (max - min + 1) + min;
}
function randomInt(min, max) {
  return Math.floor(randomValue(min, max));
}

// src/index.tsx
var LoadingBar = React.forwardRef(
  ({
    progress,
    height = 2,
    className = "",
    color = "red",
    background = "transparent",
    onLoaderFinished,
    transitionTime = 300,
    loaderSpeed = 500,
    waitingTime = 1e3,
    shadow = true,
    containerStyle = {},
    style = {},
    shadowStyle: shadowStyleProp = {},
    containerClassName = ""
  }, ref) => {
    const isMounted = React.useRef(false);
    const [localProgress, localProgressSet] = React.useState(0);
    const pressedContinuous = React.useRef({ active: false, refreshRate: 1e3 });
    const [pressedStaticStart, setStaticStartPressed] = React.useState({ active: false, value: 60 });
    const initialLoaderStyle = {
      height: "100%",
      background: color,
      transition: `all ${loaderSpeed}ms ease`,
      width: "0%"
    };
    const loaderContainerStyle = {
      position: "fixed",
      top: 0,
      left: 0,
      height,
      background,
      zIndex: 99999999999,
      width: "100%"
    };
    const initialShadowStyles = {
      boxShadow: `0 0 10px ${color}, 0 0 10px ${color}`,
      width: "5%",
      opacity: 1,
      position: "absolute",
      height: "100%",
      transition: `all ${loaderSpeed}ms ease`,
      transform: "rotate(2deg) translate(0px, -2px)",
      left: "-10rem"
    };
    const [loaderStyle, loaderStyleSet] = React.useState(initialLoaderStyle);
    const [shadowStyle, shadowStyleSet] = React.useState(initialShadowStyles);
    React.useEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    }, []);
    React.useImperativeHandle(ref, () => ({
      continuousStart(startingValue, refreshRate = 1e3) {
        if (pressedStaticStart.active) return;
        if (progress !== void 0) {
          console.warn(
            "react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!"
          );
          return;
        }
        const val = startingValue || randomInt(10, 20);
        pressedContinuous.current = {
          active: true,
          refreshRate
        };
        localProgressSet(val);
        checkIfFull(val);
      },
      staticStart(startingValue) {
        if (pressedContinuous.current.active) return;
        if (progress !== void 0) {
          console.warn(
            "react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!"
          );
          return;
        }
        const val = startingValue || randomInt(30, 60);
        setStaticStartPressed({
          active: true,
          value: val
        });
        localProgressSet(val);
        checkIfFull(val);
      },
      start(type = "continuous", startingValue, refreshRate) {
        if (progress !== void 0) {
          console.warn(
            "react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!"
          );
          return;
        }
        if (type === "continuous") {
          pressedContinuous.current = {
            active: true,
            refreshRate: refreshRate || 1e3
          };
        } else {
          setStaticStartPressed({
            active: true,
            value: startingValue || 20
          });
        }
        const continuousRandom = randomInt(10, 20);
        const staticRandom = randomInt(30, 70);
        const val = startingValue || (type === "continuous" ? continuousRandom : staticRandom);
        localProgressSet(val);
        checkIfFull(val);
      },
      complete() {
        if (progress !== void 0) {
          console.warn(
            "react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!"
          );
          return;
        }
        localProgressSet(100);
        checkIfFull(100);
      },
      increase(value) {
        if (progress !== void 0) {
          console.warn(
            "react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!"
          );
          return;
        }
        localProgressSet((prev) => {
          const newVal = prev + value;
          checkIfFull(newVal);
          return newVal;
        });
      },
      decrease(value) {
        if (progress !== void 0) {
          console.warn(
            "react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!"
          );
          return;
        }
        localProgressSet((prev) => {
          const newVal = prev - value;
          checkIfFull(newVal);
          return newVal;
        });
      },
      getProgress() {
        return localProgress;
      }
    }));
    React.useEffect(() => {
      loaderStyleSet({
        ...loaderStyle,
        background: color
      });
      shadowStyleSet({
        ...shadowStyle,
        boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`
      });
    }, [color]);
    React.useEffect(() => {
      if (ref) {
        if (ref && progress !== void 0) {
          console.warn(
            `react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar! Please use only props or only ref methods! Ref methods will override props if "ref" property is available.`
          );
          return;
        }
        checkIfFull(localProgress);
      } else {
        if (progress) checkIfFull(progress);
      }
    }, [progress]);
    const checkIfFull = (_progress) => {
      if (_progress >= 100) {
        loaderStyleSet({
          ...loaderStyle,
          width: "100%"
        });
        if (shadow) {
          shadowStyleSet({
            ...shadowStyle,
            left: _progress - 10 + "%"
          });
        }
        setTimeout(() => {
          if (!isMounted.current) {
            return;
          }
          loaderStyleSet({
            ...loaderStyle,
            opacity: 0,
            width: "100%",
            transition: `all ${transitionTime}ms ease-out`,
            color
          });
          setTimeout(() => {
            if (!isMounted.current) {
              return;
            }
            if (pressedContinuous.current.active) {
              pressedContinuous.current = {
                ...pressedContinuous.current,
                active: false
              };
              localProgressSet(0);
              checkIfFull(0);
            }
            if (pressedStaticStart.active) {
              setStaticStartPressed({
                ...pressedStaticStart,
                active: false
              });
              localProgressSet(0);
              checkIfFull(0);
            }
            if (onLoaderFinished) onLoaderFinished();
            localProgressSet(0);
            checkIfFull(0);
          }, transitionTime);
        }, waitingTime);
      } else {
        loaderStyleSet((_loaderStyle) => {
          return {
            ..._loaderStyle,
            width: _progress + "%",
            opacity: 1,
            transition: _progress > 0 ? `all ${loaderSpeed}ms ease` : ""
          };
        });
        if (shadow) {
          shadowStyleSet({
            ...shadowStyle,
            left: _progress - 5.5 + "%",
            transition: _progress > 0 ? `all ${loaderSpeed}ms ease` : ""
          });
        }
      }
    };
    useInterval(
      () => {
        const minValue = Math.min(10, (100 - localProgress) / 5);
        const maxValue = Math.min(20, (100 - localProgress) / 3);
        const random = randomValue(minValue, maxValue);
        if (localProgress + random < 95) {
          localProgressSet(localProgress + random);
          checkIfFull(localProgress + random);
        }
      },
      pressedContinuous.current.active ? pressedContinuous.current.refreshRate : null
    );
    return /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: containerClassName,
        style: { ...loaderContainerStyle, ...containerStyle }
      },
      /* @__PURE__ */ React__namespace.createElement("div", { className, style: { ...loaderStyle, ...style } }, shadow ? /* @__PURE__ */ React__namespace.createElement("div", { style: { ...shadowStyle, ...shadowStyleProp } }) : null)
    );
  }
);
var LoaderContext = React__namespace.createContext(void 0);
var LoadingBarContainer = ({
  children,
  props
}) => {
  const [hookProps, setProps] = React.useState(props || {});
  const ref = React.useRef(null);
  const start = (type = "continuous") => {
    var _a;
    return (_a = ref.current) == null ? void 0 : _a.start(type);
  };
  return /* @__PURE__ */ React__namespace.createElement(
    LoaderContext.Provider,
    {
      value: {
        start,
        complete: () => {
          var _a;
          return (_a = ref.current) == null ? void 0 : _a.complete();
        },
        getProgress: () => {
          var _a;
          return ((_a = ref.current) == null ? void 0 : _a.getProgress()) || 0;
        },
        increase: (value) => {
          var _a;
          return (_a = ref.current) == null ? void 0 : _a.increase(value);
        },
        decrease: (value) => {
          var _a;
          return (_a = ref.current) == null ? void 0 : _a.decrease(value);
        },
        setProps: (props2) => setProps({ ...props2, ...hookProps })
      }
    },
    /* @__PURE__ */ React__namespace.createElement(LoadingBar, { ref, ...hookProps }),
    children
  );
};
var useLoadingBar = (props) => {
  const context = React__namespace.useContext(LoaderContext);
  if (!context) {
    throw new Error(
      "[react-top-loading-bar] useLoadingBar hook must be used within a LoadingBarContainer. Try wrapping parent component in <LoadingBarContainer>."
    );
  }
  React.useEffect(() => {
    if (props) context.setProps(props);
  }, []);
  return {
    start: context.start,
    complete: context.complete,
    increase: context.increase,
    decrease: context.decrease,
    getProgress: context.getProgress
  };
};

exports.LoadingBarContainer = LoadingBarContainer;
exports.default = LoadingBar;
exports.useLoadingBar = useLoadingBar;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map