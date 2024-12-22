import React, { useState, useRef } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import atom from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

import "./index.css";
import { changeColor } from "./changeColor";
import Button from "./components/Button";

SyntaxHighlighter.registerLanguage("javascript", js);

const App: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [barColor, setBarColor] = useState<string>("#f11946");
  const [buttonsColor, setButtonsColor] = useState<string>("red");
  const ref = useRef<LoadingBarRef>(null);
  const [usingRef, setUsingRef] = useState<boolean>(true);
  const [usingHooks, setUsingHooks] = useState<boolean>(true);

  const changeMode = (refMode: boolean) => {
    if (refMode) {
      setProgress(0);
    }

    setUsingRef(refMode);
  };

  return (
    <div>
      {usingRef ? (
        <LoadingBar color={barColor} ref={ref} shadow={true} />
      ) : (
        <LoadingBar
          color={barColor}
          shadow
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
      )}

      <div className="text-container">
        <h1 className="header">react-top-loading-bar</h1>
        <div className="inline">
          <Button>npm i react-top-loading-bar</Button>
          <br />
          or
          <br />
          <Button>yarn add react-top-loading-bar</Button>
        </div>
      </div>
      <div className="buttons-group">
        <SyntaxHighlighter
          language="javascript"
          style={atom}
          className="code-highlighter"
        >
          {usingRef
            ? usingHooks
              ? `const { start, complete } = useLoadingBar({ color: "blue", height: 2 });
              \n<button onClick={() => start()}>Start</button>
            `
              : `const ref = useRef<LoadingBarRef>(null);\n\n<LoadingBar ref={ref} />\n\nref.current?.start()`
            : `const [progress, setProgress] = useState(0);\n\n<LoadingBar color={barColor} progress={progress}
    onLoaderFinished={() => setProgress(0)} />`}
        </SyntaxHighlighter>
        <br />
        {usingRef ? (
          <div>
            <button
              className={"btn " + buttonsColor}
              onClick={() => ref.current?.start()}
            >
              Start Continuous Loading Bar
            </button>
            <button
              className={"btn " + buttonsColor}
              onClick={() => ref.current?.start("static")}
            >
              Start Static Loading Bar
            </button>
            <button
              className={"btn " + buttonsColor}
              onClick={() => ref.current?.complete()}
            >
              Complete
            </button>
            <br />
          </div>
        ) : (
          <div>
            <button
              className={"btn " + buttonsColor}
              onClick={() => setProgress(progress + 10)}
            >
              Add 10%
            </button>
            <button
              className={"btn " + buttonsColor}
              onClick={() => setProgress(progress + 30)}
            >
              Add 30%
            </button>
            <button
              className={"btn " + buttonsColor}
              onClick={() => setProgress(progress + 50)}
            >
              Add 50%
            </button>

            <br />
          </div>
        )}

        <button
          className={"btn " + buttonsColor}
          onClick={() => {
            const colors = changeColor(buttonsColor);
            setBarColor(colors.barColor);
            setButtonsColor(colors.color);
          }}
        >
          Change Color
        </button>
        <button
          className={"btn " + buttonsColor}
          onClick={() => changeMode(!usingRef)}
        >
          Change to {usingRef ? "State" : "Refs"} Mode
        </button>

        {usingRef && (
          <button
            className={"btn " + buttonsColor}
            onClick={() => setUsingHooks(!usingHooks)}
          >
            {usingHooks
              ? "Using Hooks, Change to Ref"
              : "Using Ref, Change to Hooks"}
          </button>
        )}
        <a
          className={"btn " + buttonsColor}
          target="_blank"
          rel="noopener noreferrer"
          href={
            usingRef
              ? usingHooks
                ? "https://github.com/klendi/react-top-loading-bar/blob/master/example/examples/ExampleWithContainer.tsx"
                : "https://github.com/klendi/react-top-loading-bar/blob/master/example/examples/ExampleWithRef.tsx"
              : "https://github.com/klendi/react-top-loading-bar/blob/master/example/examples/ExampleWithState.tsx"
          }
        >
          Example
        </a>
        <br />
        <br />
        <div className="github-buttons">
          <a
            className="github-button"
            href="https://github.com/klendi/react-top-loading-bar"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-size="large"
            data-show-count="true"
            aria-label="Star klendi/react-top-loading-bar on GitHub"
          >
            Star
          </a>{" "}
          <a
            className="github-button"
            href="https://github.com/klendi"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-size="large"
            data-show-count="true"
            aria-label="Follow @klendi on GitHub"
          >
            Follow @klendi
          </a>
        </div>
        <br />
        <div>
          Made with ❤️ by{" "}
          <a
            href="https://klendi.dev"
            style={{ color: barColor }}
            target="_blank"
            rel="noreferrer"
          >
            Klendi Goci
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
