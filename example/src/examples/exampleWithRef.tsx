import { useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

const App = () => {
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
      <br />
    </div>
  );
};

export default App;
